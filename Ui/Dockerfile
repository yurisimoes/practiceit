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

# Build the Angular app
RUN ng build --configuration production

# Use the official NGINX image to serve the app and set up a reverse proxy
FROM nginx

# Copy the built Angular app to NGINX
COPY --from=build /app/dist/ui /usr/share/nginx/html

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf