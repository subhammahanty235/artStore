package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ShopOwner struct {
	ID                 primitive.ObjectID `json:"_id" bson:"_id"`
	Name               string             `json:"name" Usage:"required"`
	MobileNum          string             `json:"mobile_number" `
	Email              string             `json:"email" Usage:"required,alphanumeric"`
	Password           string             `json:"password"`
	CreatedAt          time.Time          `json:"created_at"`
	IdentityProof      []string           `json:"identityProof,omitempty" bson:"identityProof,omitempty"`
	VerificationStatus bool               `json:"verificationStatus" bson:"verificationStatus"`
	ProfilePicture     string             `json:"profilePic" bson:"profilePic"`
	AadharNumber       string             `json:"aadharNumber" bson:"aadharNumber"`
}
