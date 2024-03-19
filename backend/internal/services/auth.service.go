package services

import (
	"github.com/gin-gonic/gin"
	"github.com/subhammahanty235/artstore-backend/internal/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

func AuthServices(r *gin.RouterGroup, g *handlers.StoreApp, db *mongo.Client) {
	router := r.Use(gin.Logger(), gin.Recovery())

	router.GET("/", g.Home())

	router.POST("/signup", g.SignUpWithPassword(db))
	router.POST("/generateOtp", g.GetOtp(db))
	router.POST("/validateOtp", g.ValidateOtp(db))
	router.POST("/loginpw", g.LoginWithPassword(db))
	router.POST("/loginwithotp", g.LoginWithOTP(db))

}
