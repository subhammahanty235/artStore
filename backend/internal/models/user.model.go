package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	Name      string             `json:"name" Usage:"required"`
	MobileNum string             `json:"mobile_number"`
	Email     string             `json:"email" Usage:"required,alphanumeric"`
	Password  string             `json:"password"`
	CreatedAt time.Time          `json:"created_at"`
}
