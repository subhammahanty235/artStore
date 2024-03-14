package query

import "go.mongodb.org/mongo-driver/mongo"

func User(db mongo.Client) mongo.Collection {
	var user = db.Database("artStoreDev").Collection("user")
	return *user
}

func Otp(db mongo.Client) mongo.Collection {
	var otp = db.Database("artStoreDev").Collection("otp")
	return *otp
}
