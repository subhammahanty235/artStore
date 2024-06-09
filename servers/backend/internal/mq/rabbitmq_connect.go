package mq

import (
	"os"

	"github.com/streadway/amqp"
)

func ConnectToRabbitMQ() (*amqp.Connection, error) {
	rabbitmqURL := os.Getenv("RABBITMQ_URL")
	conn, err := amqp.Dial(rabbitmqURL)
	if err != nil {
		return nil, err
	}
	return conn, nil
}
