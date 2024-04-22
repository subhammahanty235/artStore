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

func AvailableCities(db mongo.Client) mongo.Collection {
	var availableCities = db.Database("artStoreDev").Collection("availableLocation")
	return *availableCities
}

func Shops(db mongo.Client) mongo.Collection {
	var shops = db.Database("artStoreDev").Collection("shops")
	return *shops
}

func ShopOwner(db mongo.Client) mongo.Collection {
	var shopOwners = db.Database("artStoreDev").Collection("shopOwner")
	return *shopOwners
}
