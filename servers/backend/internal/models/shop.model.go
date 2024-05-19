package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Address struct {
	StreetAddress string `json:"streetAddress,omitempty" bson:"streetAddress,omitempty"`
	Locality      string `json:"locality,omitempty" bson:"locality,omitempty"`
	Landmark      string `json:"landmark" bson:"landmark"`
	Pincode       string `json:"pincode,omitempty" bson:"pincode,omitempty"`
}

type Shop struct {
	ID                 primitive.ObjectID   `json:"_id" bson:"_id"`
	ShopCode           string               `json:"shopCode" bson:"shopCode"`
	OwnerId            primitive.ObjectID   `json:"shopOwner,omitempty" bson:"shopOwner,omitempty"`
	Images             []string             `json:"images,omitempty" bson:"images,omitempty"`
	ShopName           string               `json:"shopName,omitempty" bson:"shopName,omitempty"`
	CityCode           string               `json:"city" bson:"city"`
	GSTNumber          string               `json:"gstNumber" bson:"gstNumber"`
	Address            Address              `json:"address" bson:"address"`
	Categories         []primitive.ObjectID `json:"categories" bson:"categories"`
	Telephone          string               `json:"telephone" bson:"telephone"`
	EmailId            string               `json:"emailId" bson:"emailId"`
	Website            string               `json:"website" bson:"website"`
	VerificationStatus bool                 `json:"verificationStatus" bson:"verificationStatus"`
	Secondarytelephone string               `json:"secondaryTelephone" bson:"secondaryTelephone"`
	AdminSideData      AdminSideData        `json:"adminSideData" bson:"adminSideData"`
}

type Reviews struct {
	ID      primitive.ObjectID `json:"_id" bson:"_id"`
	UserId  primitive.ObjectID `json:"userId" bson:"userId"`
	Message string             `json:"message" bson:"message"`
	Images  []string           `json:"images,omitempty" bson:"images,omitempty"`
}

type Rating struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	TotalRatings int                `json:"totalRatings" bson:"totalRatings"`
	Rating       float64            `json:"rating" bson:"rating"`
}

type RatingAndReviews struct {
	ID        primitive.ObjectID   `json:"_id" bson:"_id"`
	ShopCode  string               `json:"shopCode" bson:"shopCode"`
	Rating    Rating               `json:"rating" bson:"rating"`
	ReviewIds []primitive.ObjectID `json:"reviewIds" bson:"reviewIds"`
}
