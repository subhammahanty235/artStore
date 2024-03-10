package query

import "go.mongodb.org/mongo-driver/mongo"

func User(db mongo.Client) mongo.Collection {
	var user = db.Database("artStoreDev").Collection("user")
	return *user
}
