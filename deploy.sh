#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if TAG is provided
TAG=${1:-latest}
echo "Deploying version: $TAG"

# Build images
echo "Building Docker images..."
docker-compose -f docker-compose.prod.yml build

# Push images to registry
echo "Pushing images to registry..."
docker-compose -f docker-compose.prod.yml push

# Deploy using docker-compose
echo "Deploying application..."
docker-compose -f docker-compose.prod.yml up -d

echo "Deployment completed successfully!"
echo "Frontend available at: https://${DOMAIN}"
echo "API available at: https://api.${DOMAIN}"
echo "Grafana dashboard available at: http://${DOMAIN}:3001"