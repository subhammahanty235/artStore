package drivers

import (
	"context"
	"time"

	"github.com/subhammahanty235/artstore-backend/internal/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var app config.GoAppTools

func Connection(URI string) mongo.Client {
	ctx, cancelCtx := context.WithTimeout(context.Background(), 10000*time.Microsecond)
	defer cancelCtx()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(URI))
	if err != nil {
		app.ErrorLogger.Panicln(err)
	}
	println("MongoDB connected successfully ------------------")

	// err = client.Ping(ctx, nil)

	// if err != nil {
	// 	app.ErrorLogger.Fatalln(err)
	// }

	return *client
}
