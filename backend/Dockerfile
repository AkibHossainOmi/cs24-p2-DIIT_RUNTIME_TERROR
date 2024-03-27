# Stage 1: Build Node.js application
FROM node:21-alpine3.18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Stage 2: Setup MySQL database
FROM mysql:latest AS db

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=my-secret-pw
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Expose the MySQL port
EXPOSE 3306

COPY ecosync.sql /docker-entrypoint-initdb.d/

# Stage 3: Final Image
# Use an official Node.js runtime as the base image
FROM node:21-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY --from=build /app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY --from=build /app/ .

# Expose the port on which the server will run
EXPOSE 8000
CMD ["node", "server.js"]