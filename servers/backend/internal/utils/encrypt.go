package utils

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// will be primarlity used for password hashing.
func Encrypt(text string) (string, error) {
	if text == "" {
		return "", fmt.Errorf("no input value")
	} else {
		hashedText, err := bcrypt.GenerateFromPassword([]byte(text), bcrypt.DefaultCost)
		if err != nil {
			return "Cannot generate the encrypted password", err
		}

		finalhashedString := string(hashedText)
		println(finalhashedString)
		return finalhashedString, nil
	}
}

func VerifyHash(text, hashedText string) (bool, error) {
	println("Hashed --> " + hashedText)
	println("test --> " + text)
	if text == "" || hashedText == "" {
		return false, nil
	}

	err := bcrypt.CompareHashAndPassword([]byte(hashedText), []byte(text))
	if err != nil {
		if err == bcrypt.ErrMismatchedHashAndPassword {
			return false, fmt.Errorf("invalid string comparison: %v", err)
		}
		return false, err
	}

	return true, nil
}
