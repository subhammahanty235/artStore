package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/drivers/query"
	"github.com/subhammahanty235/artstore-backend/internal/models"
	"github.com/subhammahanty235/artstore-backend/internal/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (ga *StoreApp) AddNewShop(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newShop *models.Shop
		if err := ctx.ShouldBindJSON(&newShop); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}
		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		if newShop.ShopName == "" || newShop.GSTNumber == "" || newShop.Telephone == "" {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Please add all the required details",
				"error":   "Please add all the required details",
				"Success": false,
			})
			return
		}

		if newShop.OwnerId == primitive.NilObjectID {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Can't create a shop without Owner Details",
				"error":   "Can't create a shop without Owner Details",
				"Success": false,
			})
			return
		}

		collection := query.Shops(*db)
		newShop.ID = primitive.NewObjectID()
		newShop.VerificationStatus = false
		randomNum, _ := utils.GenerateOtp(4)
		newShop.ShopCode = newShop.ShopName + randomNum
		_, insertErr := collection.InsertOne(dbCtx, newShop)
		if insertErr != nil {
			var g *query.StoreAppDB
			g.App.ErrorLogger.Fatalf("Cannot add user to database %v", insertErr)
			return

		}

		ctx.JSON(http.StatusOK, gin.H{

			"message":             "Added Successfully",
			"Shop":                newShop.ShopName,
			"Verification Status": newShop.VerificationStatus,

			"success": true,
		})
		// return

	}

}

func (ga *StoreApp) ShopOwnerSignup(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var shopOwner *models.ShopOwner
		if err := ctx.ShouldBindJSON(&shopOwner); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}
		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		if shopOwner.AadharNumber == "" {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Please add all the required details",
				"error":   "Please add all the required details",
				"Success": false,
			})
			return
		}

		collection := query.User(*db)
		filter := bson.D{{Key: "email", Value: shopOwner.Email}}
		var response bson.M
		findErr := collection.FindOne(dbCtx, filter).Decode(&response)

		if findErr != nil {
			if findErr == mongo.ErrNoDocuments {
				ctx.JSON(http.StatusNotFound, gin.H{
					"message": "Please signup as a normal user to start the process",
					"error":   findErr,
					"success": false,
				})
				return
			}
		}
		shopOwner.ID = primitive.NewObjectID()
		shopOwner.Password = response["password"].(string)
		shopOwner.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		shopOwnerColl := query.ShopOwner(*db)

		_, insertErr := shopOwnerColl.InsertOne(dbCtx, shopOwner)
		if insertErr != nil {
			var g *query.StoreAppDB
			g.App.ErrorLogger.Fatalf("Cannot add user to database %v", insertErr)
			return

		} else {
			ctx.JSON(http.StatusOK, gin.H{

				"message": "SignUp Complete",
				"error":   nil,
				"success": true,
			})
		}

	}
}

func (ga *StoreApp) FetchAllShopsInCity(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type LocationInput struct {
			City string `uri:"city" binding:"required"`
		}

		var reqData *LocationInput
		if err := ctx.ShouldBindUri(&reqData); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		dbctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var cityData bson.M
		cityCollection := query.AvailableCities(*db)

		findCityErr := cityCollection.FindOne(dbctx, bson.D{{Key: "city", Value: reqData.City}}).Decode(&cityData)
		if findCityErr == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Error while finding the city details",
				"error":   findCityErr.Error(),
				"success": false,
			})
			return
		}

		var shopsData []bson.M

		collection := query.Shops(*db)

		projection := bson.M{
			"shopName":   1,
			"address":    1,
			"categories": 1,
			"images":     1,
		}

		print(cityData)

		cursor, err := collection.Find(dbctx, bson.M{"city": cityData["cityCode"]}, options.Find().SetProjection(projection))

		if err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Failed to fetch",
				"success": false,
			})
			return
		}

		defer cursor.Close(dbctx)
		for cursor.Next(dbctx) {
			var shop bson.M
			if err := cursor.Decode(&shop); err != nil {
				ctx.JSON(500, gin.H{"error": "Failed to decode shop"})
				return
			}

			shopsData = append(shopsData, shop)
		}
		if err := cursor.Err(); err != nil {
			ctx.JSON(500, gin.H{"error": "Cursor error"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Shops Fetched Successfully",
			"success": true,
			"Shops":   shopsData,
		})
	}
}

func (ga *StoreApp) SearchShop(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type SearchInput struct {
			Query string `json:"query" binding:"required"`
			City  string `json:"city" binding:"required"`
		}

		var input SearchInput
		if err := ctx.ShouldBindJSON(&input); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var cityData bson.M
		cityCollection := query.AvailableCities(*db)

		findCityErr := cityCollection.FindOne(dbCtx, bson.D{{Key: "city", Value: input.City}}).Decode(&cityData)
		if findCityErr == mongo.ErrNoDocuments {
			ctx.JSON(http.StatusNotFound, gin.H{
				"message": "Error while finding the city details",
				"error":   findCityErr.Error(),
				"success": false,
			})
			return
		}

		collection := query.Shops(*db)

		filter := bson.M{
			"city":     cityData["cityCode"],
			"shopName": bson.M{"$regex": input.Query, "$options": "i"},
		}

		cursor, err := collection.Find(dbCtx, filter)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to search shops"})
			return
		}

		defer cursor.Close(dbCtx)

		var shops []models.Shop
		if err := cursor.All(dbCtx, &shops); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode shops"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{"shops": shops})
	}
}
