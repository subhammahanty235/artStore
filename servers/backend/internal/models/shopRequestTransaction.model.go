package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Transaction model : Whenever a new shop will be requested to get registered, a new transaction will be created and then the shop, user and products will contain the transaction id. It will also ensure with just one click of the admin , the shop will be registered, the user will be verified and the initial products will be listed.

type RequestCreatedModel struct {
	Status    bool      `json:"status" bson:"status" Default:"false"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt"`
}
type RequestApprovedModel struct {
	Status     bool      `json:"status" bson:"status" Default:"false"`
	ApprovedOn time.Time `json:"createdAt" bson:"createdAt"`
}

type RequestDeclinedModel struct {
	Status     bool      `json:"status" bson:"status" Default:"false"`
	DeclinedOn time.Time `json:"createdAt" bson:"createdAt"`
}

type ShopRequestTransactions struct {
	ID              primitive.ObjectID   `json:"_id" bson:"_id"`
	TransactionId   primitive.ObjectID   `json:"transactionId" bson:"transactionId"`
	RequestCreated  RequestCreatedModel  `json:"requestCreated" bson:"requestCreated"`
	RequestApproved RequestApprovedModel `json:"requestApproved" bson:"requestApproved"`
	RequestDeclined RequestDeclinedModel `json:"requestDeclined" bson:"requestDeclined"`
	UserId          primitive.ObjectID   `json:"userId" bson:"userId"`
}
