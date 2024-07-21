# Use the official Node.js image to build the app
FROM node:18 AS build
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . ./

# Set environment variables and replace placeholders in environment.prod.ts
ARG GOOGLE_CLIENT_ID
RUN sed -i "s|GOOGLE_CLIENT_ID|${GOOGLE_CLIENT_ID}|g" src/environments/environment.prod.ts

# Build the Angular app
RUN ng build --configuration production

# Use the official NGINX image to serve the app and set up a reverse proxy
FROM nginx

# Copy the built Angular app to NGINX
COPY --from=build /app/dist/ui /usr/share/nginx/html

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf