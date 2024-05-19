package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BasicDetails struct {
	Name        string `json:"name" bson:"name"`
	Brand       string `json:"brand" bson:"brand"`
	Description string `json:"description" bson:"description"`
}

type ProductImage struct {
	Image    string `json:"image" bson:"image"`
	Approved bool   `json:"approved" bson:"approved" Default:"false"`
}

type ProductPrice struct {
	Price    int    `json:"price"  bson:"price"`
	Currency string `json:"currency" bson:"currency"`
	Discount int    `json:"discount" bson:"discount"`
}

type ProductStocks struct {
	Size  string `json:"size" bson:"size"`
	Stock int    `json:"stock" bson:"stock"`
	Price int    `json:"price" bson:"price"`
}

type AdminSideData struct {
	TransactionId primitive.ObjectID `json:"transactionId"`
	UserId        primitive.ObjectID `json:"userId"`
	ShopId        primitive.ObjectID `json:"shopId"`
	Status        int                `json:"status"` // 1---> listed | 2 ---> unlisted by Admin | 3 --> unlisted by owner
}

type DayWiseSales struct {
	Date     time.Time            `json:"date"`
	SalesIds []primitive.ObjectID `json:"salesIds"`
}

type MonthWiseSales struct {
	Month string `json:"month"`

	DayWiseSaleData []DayWiseSales `json:"dayWiseSalesData"`
}

type YearWiseSales struct {
	Year           int              `json:"year"`
	MonthWiseSales []MonthWiseSales `json:"monthWiseSales"`
}

type SalesAnalysisData struct {
	ShopId        primitive.ObjectID `json:"shopId"`
	ProductId     primitive.ObjectID `json:"productId"`
	YearWiseSales YearWiseSales      `json:"yearWiseSales"`
}

type Product struct {
	ID                primitive.ObjectID   `json:"_id" bson:"_id"`
	BasicDetails      BasicDetails         `json:"basicDetails" bson:"basicDetails"`
	Images            []ProductImage       `json:"images" bson:"images"`
	Price             ProductPrice         `json:"price" bson:"price"`
	Inventory         ProductStocks        `json:"inventory" bson:"inventory"`
	ReviewIds         []primitive.ObjectID `json:"reviewIds" bson:"reviewIds"`
	Rating            Rating               `json:"rating" bson:"rating"` // this review structure is imported from the shop model
	SalesAnalysisData SalesAnalysisData    `json:"salesAnalysisData" bson:"salesAnalysisData"`
}
