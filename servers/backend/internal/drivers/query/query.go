package query

import (
	"github.com/subhammahanty235/artstore-backend/internal/config"
	"github.com/subhammahanty235/artstore-backend/internal/drivers"
	"go.mongodb.org/mongo-driver/mongo"
)

type StoreAppDB struct {
	App *config.GoAppTools
	DB  *mongo.Client
}

func NewStoreAppDB(app *config.GoAppTools, db *mongo.Client) drivers.DBRepo {
	return &StoreAppDB{
		App: app,
		DB:  db,
	}
}
