# Dockerfile for orchestration or common tasks

# Set the base image
FROM alpine:latest
WORKDIR /app

# Copy the backend folder
COPY backend ./backend

# Copy the node_server folder
COPY node_server ./node_server

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf
