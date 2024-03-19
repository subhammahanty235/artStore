package main

import (
	"context"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/subhammahanty235/artstore-backend/internal/config"
	"github.com/subhammahanty235/artstore-backend/internal/drivers"
	"github.com/subhammahanty235/artstore-backend/internal/handlers"
	"github.com/subhammahanty235/artstore-backend/internal/services"
)

var app config.GoAppTools

func main() {
	InfoLogger := log.New(os.Stdout, " ", log.LstdFlags|log.Lshortfile)
	ErrorLogger := log.New(os.Stdout, " ", log.LstdFlags|log.Lshortfile)

	app.InfoLogger = InfoLogger
	app.ErrorLogger = ErrorLogger
	dir, everr := filepath.Abs(filepath.Dir(os.Args[0]))
	if everr != nil {
		log.Fatal(everr)
	}
	err := godotenv.Load(filepath.Join(dir, ".env"))
	if err != nil {
		app.ErrorLogger.Fatal("No .env file available" + err.Error())
	}

	uri := os.Getenv("MONGODB_URI")
	println(uri)

	if uri == "" {
		app.ErrorLogger.Fatalln("Mongodb uri string is not available")
	}

	// connecting to the database
	client := drivers.Connection(uri)
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			app.ErrorLogger.Fatal(err)
			return
		}
	}()

	router := gin.New()

	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	})

	storeApp := handlers.NewStoreApp(&app, &client)

	services.Services(router, storeApp, &client)

	router.Run(":8080")
}
