#!/bin/bash

# This script can be used to test the docker build operation.  Although
# production builds are handled by the C.I. server, this script allows
# testing of the docker build, locally, as part of the development process.

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Building the Base Image ($ECR_FULL_DEPLOY)"
echo "--------------------------------------------------------------------------------------------"
echo ""

# Authenticate with AWS ECR
eval $(aws ecr get-login --no-include-email --region us-east-1)

# Remove existing, local, images (if they exist)
docker rmi "$ECR_FULL_DEPLOY" 2>/dev/null

# Execute the build
docker build \
	--pull=false \
	--rm=true \
	--force-rm=true \
	--tag="$ECR_FULL_DEPLOY" \
	--file=docker/deploy-image/Dockerfile \
	./docker/deploy-image
