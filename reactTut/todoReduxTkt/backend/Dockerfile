# Use the official Node LTS image
FROM node:lts

# Set the working directory
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
