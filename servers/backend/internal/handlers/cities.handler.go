package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	// "github.com/subhammahanty235/artstore-backend/internal/config"
	// "github.com/subhammahanty235/artstore-backend/internal/drivers"
	"github.com/subhammahanty235/artstore-backend/internal/drivers/query"
	"github.com/subhammahanty235/artstore-backend/internal/models"
	"github.com/subhammahanty235/artstore-backend/internal/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// type StoreApp struct {
// 	App *config.GoAppTools
// 	DB  drivers.DBRepo
// }

// func NewStoreApp(app *config.GoAppTools, db *mongo.Client) *StoreApp {
// 	return &StoreApp{
// 		App: app,
// 		DB:  query.NewStoreAppDB(app, db),
// 	}
// }

func (ga *StoreApp) AddNewCity(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newCity *models.AvailableCities
		if err := ctx.ShouldBindJSON(&newCity); err != nil {
			_ = ctx.AbortWithError(http.StatusBadRequest, gin.Error{Err: err})
		}

		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		if newCity.City == "" || newCity.State == "" {
			ctx.JSON(http.StatusUnprocessableEntity, gin.H{
				"message": "Please add all the required details",
				"error":   "Please add all the required details",
				"Success": false,
			})
			return
		}

		collection := query.AvailableCities(*db)
		newCity.ID = primitive.NewObjectID()
		randomNum, _ := utils.GenerateOtp(4)
		// .ShopCode = newShop.ShopName + randomNum
		newCity.CityCode = newCity.City[0:2] + randomNum

		_, insertErr := collection.InsertOne(dbCtx, newCity)
		if insertErr != nil {
			var g *query.StoreAppDB
			g.App.ErrorLogger.Fatalf("Cannot add user to database %v", insertErr)
			return

		}

		ctx.JSON(http.StatusOK, gin.H{

			"message": "Added Successfully",
			"city":    newCity.City,

			"success": true,
		})
		// return

	}
}

func (ga *StoreApp) FetchAllAvailableCities(db *mongo.Client) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		collection := query.AvailableCities(*db)
		var cities []bson.M

		dbCtx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		cursor, err := collection.Find(dbCtx, bson.D{})
		if err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{

				"message": " Failed to fetch ",

				"success": false,
			})
			return
		}

		defer cursor.Close(dbCtx)
		for cursor.Next(dbCtx) {
			var city bson.M
			if err := cursor.Decode(&city); err != nil {
				ctx.JSON(500, gin.H{"error": "Failed to decode city"})
				return
			}
			cities = append(cities, city)
		}

		if err := cursor.Err(); err != nil {
			ctx.JSON(500, gin.H{"error": "Cursor error"})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{

			"message": "Cities Fetched Successfully",
			"success": true,
			"cities":  cities,
		})
		// return

	}
}
