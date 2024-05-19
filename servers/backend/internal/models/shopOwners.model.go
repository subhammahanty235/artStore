package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AdminSideDataForOwner struct {
	TransactionId primitive.ObjectID `json:"transactionId"`
	UserId        primitive.ObjectID `json:"userId"`
	Status        int                `json:"status"`
}

type ShopOwner struct {
	ID                    primitive.ObjectID    `json:"_id" bson:"_id"`
	Name                  string                `json:"name" Usage:"required"`
	MobileNum             string                `json:"mobile_number" `
	Email                 string                `json:"email" Usage:"required,alphanumeric"`
	Password              string                `json:"password"`
	CreatedAt             time.Time             `json:"created_at"`
	IdentityProof         []string              `json:"identityProof,omitempty" bson:"identityProof,omitempty"`
	VerificationStatus    bool                  `json:"verificationStatus" bson:"verificationStatus"`
	ProfilePicture        string                `json:"profilePic" bson:"profilePic"`
	AadharNumber          string                `json:"aadharNumber" bson:"aadharNumber"`
	AdminSideDataForOwner AdminSideDataForOwner `json:"adminSideData" bson:"adminSideData"`
}

type ManagementTeam struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id"`
	Name           string             `json:"name" Usage:"required"`
	MobileNum      string             `json:"mobile_number" `
	Email          string             `json:"email" Usage:"required,alphanumeric"`
	IdentityProof  []string           `json:"identityProof,omitempty" bson:"identityProof,omitempty"`
	ShopId         primitive.ObjectID `json:"shopId" bson:"shopId"`
	ProfilePicture string             `json:"profilePic" bson:"profilePic"`
	Role           string             `json:"role" bson:"role"`
	RegisterDate   time.Time          `json:"registerdate" bson:"registerdate"`
}
