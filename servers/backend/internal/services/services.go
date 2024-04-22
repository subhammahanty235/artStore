package services

import (
	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

func Services(r *gin.Engine, g *handlers.StoreApp, db *mongo.Client) {
	router := r.Use(gin.Logger(), gin.Recovery())

	router.GET("/", g.Home())
	// router.POST("/signuptemp", g.SignUp(db))
	authGroup := r.Group("/auth")
	{
		AuthServices(authGroup, g, db)
	}
	cityGroup := r.Group("/city")
	{
		CityService(cityGroup, g, db)
	}
	shopGroup := r.Group("/shop")
	{
		ShopService(shopGroup, g, db)
	}

}
