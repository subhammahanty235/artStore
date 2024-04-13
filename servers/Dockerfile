# Use a base image, such as Alpine Linux, to keep the image size small
FROM alpine:latest

# Install necessary packages or perform common setup tasks
RUN apk update && \
    apk add --no-cache curl jq && \
    mkdir /data

# Set the working directory inside the container
WORKDIR /data

# Copy any additional scripts or configuration files
COPY scripts/* /data/

# Set permissions or execute setup scripts if needed
RUN chmod +x /data/*.sh

# Define environment variables if necessary
ENV ENV_VAR_NAME=value

# Define a command to run when the container starts
CMD ["/bin/sh", "-c", "echo 'Hello from the base Dockerfile' && sleep infinity"]
