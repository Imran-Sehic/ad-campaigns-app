# Use the official Go image as a base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire source code to the container
COPY . .

# Build the Go application
RUN go build -o main

# Expose the port the application will run on
EXPOSE 8080

# Command to run the application
CMD ["./main"]
