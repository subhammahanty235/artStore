# #!/bin/bash

# # Start RabbitMQ in the background
# service rabbitmq-server start

# # Wait until RabbitMQ is ready to accept connections
# while ! nc -z localhost 5672; do
#     echo "Waiting for RabbitMQ to start..."
#     sleep 2
# done

# # RabbitMQ started successfully, now run your Golang application
# echo "<-------- RabbitMQ started successfully -------->"
# # go run backend/cmd/main.go && node node_server/index.js
# go run backend/cmd/main.go &  # Run Golang application in the background
# node node_server/index.js  # Run Node.js application
# # echo "<-------- Backend server compiler successfully ------->

