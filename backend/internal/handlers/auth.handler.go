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

func (ga *StoreApp) SignUp(db *mongo.Client) gin.HandlerFunc {
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
				})
				return
			}
			g.App.ErrorLogger.Fatal(findErr)
		}

		ctx.JSON(http.StatusFound, gin.H{
			"message": "Exisiting account, go to the login page",
		})
		// return

		// if err != nil {
		// 	_ = ctx.AbortWithError(http.StatusInternalServerError, errors.New("error while adding new user"))
		// 	ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})

		// }
		// if !ok {
		// 	_ = ctx.AbortWithError(http.StatusInternalServerError, err)
		// 	return
		// }

		// switch status {
		// case 1:
		// 	ctx.JSON(http.StatusOK, gin.H{
		// 		"message": "Registered Successfully",
		// 	})
		// 	return

		// case 2:
		// 	ctx.JSON(http.StatusFound, gin.H{
		// 		"message": "Exisiting account, go to the login page",
		// 	})
		// 	return
		// }
	}
}
