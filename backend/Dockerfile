# Start from the official Golang image
FROM golang:latest

# Set the current working directory inside the container
WORKDIR /app

# Install netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code into the container
COPY . .

# Expose port 8080 for your Golang application
EXPOSE 8080

# Install RabbitMQ
RUN apt-get update && \
    apt-get install -y rabbitmq-server && \
    rabbitmq-plugins enable rabbitmq_management

# Expose RabbitMQ ports
EXPOSE 5672 15672

# Copy the entrypoint script into the container
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["/app/entrypoint.sh"]
