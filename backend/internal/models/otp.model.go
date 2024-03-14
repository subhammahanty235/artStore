package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Otp struct {
	ID                 primitive.ObjectID `json:"_id" bson:"_id"`
	EmailId            string             `json:"emailId" bson:"emailId" Usage:"required"`
	SentOtp            string             `json:"sentOtp" bson:"sentOtp" Usage:"required"`
	RequestedOn        time.Time          `json:"requestedOn" bson:"requestedOn" `
	ValidTill          time.Time          `json:"validTill" bson:"validTill"`
	VerificationStatus bool               `json:"verificationStatus" bson:"verificationStatus" Default:"false"`
}
