package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AvailableCities struct {
	ID       primitive.ObjectID `json:"_id" bson:"_id"`
	City     string             `json:"city" bson:"city"`
	CityCode string             `json:"cityCode" bson:"cityCode"`
	State    string             `json:"state" bson:"state"`
	Country  string             `json:"country" bson:"country"`
}
