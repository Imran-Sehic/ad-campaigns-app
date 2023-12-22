# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
