package handlers

import (
	"context"

	// "errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/config"
	"github.com/subhammahanty235/artstore-backend/internal/drivers"
	"github.com/subhammahanty235/artstore-backend/internal/drivers/query"
	"github.com/subhammahanty235/artstore-backend/internal/models"
	"github.com/subhammahanty235/artstore-backend/internal/mq"
	"github.com/subhammahanty235/artstore-backend/internal/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type StoreApp struct {
	App *config.GoAppTools
	DB  drivers.DBRepo
}

func NewStoreApp(app *config.GoAppTools, db *mongo.Client) *StoreApp {
	return &StoreApp{
		App: app,
		DB:  query.NewStoreAppDB(app, db),
	}
}

func (ga *StoreApp) Home() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"resp": "Welcome to Go App home page"})
	}
}

func (ga *StoreApp) SignUpWithPassword(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user *models.User

		if err := ctx.ShouldBindJSON(&user); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		user.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Password, _ = utils.Encrypt(user.Password)
		// ok, status, err := ga.DB.AddUser(user)

		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var g *query.StoreAppDB

		collection := query.User(*db)
		filter := bson.D{{Key: "email", Value: user.Email}}
		var res bson.M

		findErr := collection.FindOne(dbCtx, filter).Decode(&res)
		if findErr != nil {
			if findErr == mongo.ErrNoDocuments {
				user.ID = primitive.NewObjectID()
				_, insertErr := collection.InsertOne(dbCtx, user)

				if insertErr != nil {
					g.App.ErrorLogger.Fatalf("Cannot add user to database %v", insertErr)

				}
				token, err := utils.Generate(user.Email, user.ID)
				if err != nil {
					ctx.JSON(http.StatusUnprocessableEntity, gin.H{
						"message": "Error while creating the token",
						"error":   err,
					})
					return
				}

				ctx.JSON(http.StatusOK, gin.H{
					"token":   token,
					"message": "Registered Successfully",
					"email":   user.Email,
					"success": true,
				})
				return
			}
			g.App.ErrorLogger.Fatal(findErr)
		}

		ctx.JSON(http.StatusFound, gin.H{
			"message": "Exisiting account, go to the login page",
			"success": false,
		})

	}
}

func (ga *StoreApp) GetOtp(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var data *models.Otp
		if err := ctx.ShouldBindJSON(&data); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		data.SentOtp, _ = utils.GenerateOtp(6)
		data.RequestedOn, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		data.ValidTill = data.RequestedOn.Add(5 * time.Minute)

		dbctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var g *query.StoreAppDB
		collection := query.Otp(*db)

		filter := bson.D{{Key: "emailId", Value: data.EmailId}}
		var res bson.M

		findErr := collection.FindOne(dbctx, filter).Decode(&res)

		if findErr != nil {
			println(findErr.Error())
		} else {
			emailId, _ := res["emailId"].(string)
			_, deleteErr := collection.DeleteOne(dbctx, bson.D{{Key: "emailId", Value: emailId}})
			if deleteErr != nil {
				g.App.ErrorLogger.Fatal(deleteErr)
			}
		}

		data.ID = primitive.NewObjectID()

		_, insertErr := collection.InsertOne(dbctx, data)

		if insertErr != nil {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Error while creating the token",
				"error":   insertErr.Error(),
				"success": false,
			})
			return
		}

		message := mq.Message{
			Type:      "sendOTP",
			EmailCode: 001,
			Payload: map[string]string{
				"email": data.EmailId,
				"otp":   data.SentOtp,
			},
		}

		err := mq.PublishMessage("email_exchange", "send_email", message)
		if err != nil {

			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error publishing message but otp generated", "err": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"emailId": data.EmailId,
			"otp":     data.SentOtp,
			"success": true,
		})

	}
}

func (ga *StoreApp) ValidateOtp(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type CustomInput struct {
			RecievedOTP string `json:"recievedOtp"`
			Name        string `json:"name"`
			EmailId     string `json:"emailId"`
		}

		var reqData *CustomInput

		if err := ctx.ShouldBindJSON(&reqData); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}
		dbctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		//fetch the required data  element from db to validate the OTP

		var findOtpData bson.M
		otpCollection := query.Otp(*db)

		findErr := otpCollection.FindOne(dbctx, bson.D{{Key: "emailId", Value: reqData.EmailId}}).Decode(&findOtpData)
		if findErr == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Error while finding the OTP details",
				"error":   findErr.Error(),
			})
			return
		}

		sentOtp, _ := findOtpData["sentOtp"].(string)
		validTillPrimitive := findOtpData["validTill"].(primitive.DateTime)
		validTill := validTillPrimitive.Time()
		currentTime := time.Now()
		isOtpExpired := currentTime.After(validTill)

		if isOtpExpired {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Your Otp is Expired, Please request again",
				"error":   nil,
				"success": false,
			})
			return
		}

		// check if Otp is matching or not
		if reqData.RecievedOTP == sentOtp {

			// save the user
			// var user *models.User
			user := new(models.User)

			user.ID = primitive.NewObjectID()
			user.Email = reqData.EmailId
			user.Name = reqData.Name
			user.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
			userCollection := query.User(*db)
			_, insertErr := userCollection.InsertOne(dbctx, user)
			if insertErr != nil {
				ctx.JSON(http.StatusUnprocessableEntity, gin.H{
					"message": "Couldn't sign up, Some error occuered!",
					"error":   insertErr.Error(),
					"success": false,
				})
				return
			} else {
				token, err := utils.Generate(user.Email, user.ID)
				if err != nil {
					ctx.JSON(http.StatusUnprocessableEntity, gin.H{
						"message": "Error occured while generating token",
						"error":   err.Error(),
						"success": false,
					})
					return
				}
				_, deleteErr := otpCollection.DeleteOne(dbctx, bson.D{{Key: "emailId", Value: user.Email}})
				if deleteErr != nil {
					var g *query.StoreAppDB
					g.App.ErrorLogger.Fatal(deleteErr)
				}
				ctx.JSON(http.StatusOK, gin.H{

					"message": "SignUp Complete",
					"error":   nil,
					"success": true,
					"token":   token,
				})
			}

		} else {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Wrong Otp, please enter correct one",
				"error":   nil,
				"success": false,
			})
			return
		}

	}
}

func (ga *StoreApp) LoginWithPassword(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type CustomStruct struct {
			EmailId  string `json:"emailId"`
			Password string `json:"password"`
		}

		var reqData *CustomStruct

		if err := ctx.ShouldBindJSON(&reqData); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		dbctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		collection := query.User(*db)
		filter := bson.D{{Key: "email", Value: reqData.EmailId}}

		var response bson.M
		findErr := collection.FindOne(dbctx, filter).Decode(&response)
		if findErr != nil {
			if findErr == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusNotFound, gin.H{
					"message": "User with this EmailId doesn't exists",
					"error":   findErr,
					"success": false,
				})
				return
			}
		}

		result, _ := utils.VerifyHash(reqData.Password, response["password"].(string))
		if result {

			idObject := response["_id"].(primitive.ObjectID)

			token, err := utils.Generate(response["email"].(string), idObject)

			if err != nil {
				ctx.JSON(http.StatusUnprocessableEntity, gin.H{
					"message": "Error while creating the token",
					"error":   err,
				})
				return
			}
			ctx.JSON(http.StatusOK, gin.H{
				"token":   token,
				"message": "Logged in Successfully",
				"email":   response["email"],
				"success": true,
			})
			return
		} else {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Wrong Password/Credentials",
				"error":   "Wrong Password",
				"success": false,
			})
			return
		}

	}
}

func (ga *StoreApp) LoginWithOTP(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type CustomInput struct {
			EmailId     string `json:"emailId"`
			RecievedOTP string `json:"recievedOtp"`
		}

		var reqdata *CustomInput

		if err := ctx.ShouldBindJSON(&reqdata); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		dbctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var findOtpData bson.M
		otpCollection := query.Otp(*db)

		otpFindErr := otpCollection.FindOne(dbctx, bson.D{{Key: "emailId", Value: reqdata.EmailId}}).Decode(&findOtpData)

		if otpFindErr == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Error while finding the OTP details",
				"error":   otpFindErr.Error(),
				"success": false,
			})
			return
		}

		sendOtp, _ := findOtpData["sentOtp"].(string)
		validTillPrimitive := findOtpData["validTill"].(primitive.DateTime)
		validTill := validTillPrimitive.Time()
		currentTime := time.Now()
		isOtpExpired := currentTime.After(validTill)

		if isOtpExpired {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Your Otp is Expired, Please request again",
				"error":   nil,
				"success": false,
			})
			return
		}

		if reqdata.RecievedOTP == sendOtp {

			userCollection := query.User(*db)

			var user bson.M

			userFindErr := userCollection.FindOne(dbctx, bson.D{{Key: "email", Value: reqdata.EmailId}}).Decode(&user)
			if userFindErr == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusUnprocessableEntity, gin.H{
					"message": "User not found! Please sign up",
					"error":   userFindErr.Error(),
					"success": false,
				})
				return
			}
			idObject := user["_id"].(primitive.ObjectID)
			token, _ := utils.Generate(user["email"].(string), idObject)

			ctx.JSON(http.StatusOK, gin.H{
				"token":   token,
				"message": "Logged in Successfully",
				"email":   user["email"],
				"success": true,
			})
			return
		} else {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Wrong Password/Credentials",
				"error":   "Wrong Password",
				"success": false,
			})
			return
		}
	}
}
