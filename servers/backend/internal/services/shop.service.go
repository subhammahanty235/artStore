package services

import (
	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

func ShopService(r *gin.RouterGroup, g *handlers.StoreApp, db *mongo.Client) {
	router := r.Use(gin.Logger(), gin.Recovery())
	router.POST("/register/shop", g.AddNewShop(db))
	router.POST("/register/owner", g.ShopOwnerSignup(db))
	router.GET("/getall/:city", g.FetchAllShopsInCity(db))
	router.POST("/search", g.SearchShop(db))
}
