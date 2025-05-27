# Step 1: Use the official Node.js image as the base image for building the React app
FROM node:18-alpine as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available) and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the entire project files into the container
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Create a production server using nginx
FROM nginx:alpine

# Step 7: Copy the build files to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose port 80
#hi mani
EXPOSE 80

# Step 9: Start nginx to serve the applicatup
CMD ["nginx", "-g", "daemon off;"]
