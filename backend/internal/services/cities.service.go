package services

import (
	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

func CityService(r *gin.RouterGroup, g *handlers.StoreApp, db *mongo.Client) {
	router := r.Use(gin.Logger(), gin.Recovery())
	router.POST("/addNewCity", g.AddNewCity(db))
	router.POST("/getAllCities", g.FetchAllAvailableCities(db))
}
