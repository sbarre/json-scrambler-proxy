FROM node:20-alpine AS base

ENV NODE_ENV=production

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app
COPY index.js /app

RUN npm install --production

# Use a distroless image
FROM gcr.io/distroless/nodejs20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY --from=base /app /app

USER nonroot

# Define the command to run the application
CMD [ "index.js" ]
