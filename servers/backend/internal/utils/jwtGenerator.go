package utils

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type StoreAppClaims struct {
	jwt.RegisteredClaims
	Email string
	ID    primitive.ObjectID
}

func Generate(email string, id primitive.ObjectID) (string, error) {

	privateKey, generr := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if generr != nil {
		println("error generating the key, ", generr.Error())
		return "", nil
	}

	storeappClaims := StoreAppClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:   "StoreAppUser",
			IssuedAt: jwt.NewNumericDate(time.Now()),
			ExpiresAt: &jwt.NumericDate{
				Time: time.Now().Add(24 * time.Hour),
			},
		},
		Email: email,
		ID:    id,
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodES256, storeappClaims).SignedString(privateKey)
	if err != nil {
		println(err.Error())
		return "", err
	}

	return token, nil

}
