#!/bin/bash

# Start RabbitMQ in the background
service rabbitmq-server start

# Wait until RabbitMQ is ready to accept connections
while ! nc -z localhost 5672; do
    echo "Waiting for RabbitMQ to start..."
    sleep 2
done

# RabbitMQ started successfully, now run your Golang application
echo "<-------- RabbitMQ started successfully -------->"
go run cmd/main.go
echo "<-------- Backend server compiler successfully ------->
