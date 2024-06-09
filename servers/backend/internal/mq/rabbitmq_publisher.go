package mq

import (
	"encoding/json"

	"github.com/streadway/amqp"
)

var rabbitMQChannel *amqp.Channel

type Message struct {
	Type      string      `json:"type"`
	EmailCode int         `json:"emailCode"`
	Payload   interface{} `json:"payload"`
}

func PublishMessage(exchange string, routingKey string, message Message) error {
	println("In the publishmessage function --------------------> ")
	conn, err := ConnectToRabbitMQ()
	if err != nil {
		return err
	}
	// defer conn.Close()
	rabbitMQChannel, err := conn.Channel()
	if err != nil {
		return err
	}

	messageBody, err := json.Marshal(message)
	if err != nil {
		return err
	}

	err = rabbitMQChannel.Publish(
		exchange,
		routingKey,
		false,
		false,
		amqp.Publishing{
			ContentType: "application/json",
			Body:        messageBody,
		},
	)

	if err != nil {
		return err
	}

	return nil
}
