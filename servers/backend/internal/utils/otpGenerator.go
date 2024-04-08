package utils

import (
	"log"
	"math/rand"
)

func GenerateOtp(length int) (string, bool) {
	const digits = "0123456789"
	randomBytes := make([]byte, length)

	_, err := rand.Read(randomBytes)

	if err != nil {
		log.Fatal("Error generating random OTP", err)
		return "Otp generation failed", false
	}

	for i, b := range randomBytes {
		randomBytes[i] = digits[int(b)%len(digits)]
	}

	return string(randomBytes), true
}
