#!/bin/bash

# Push the Deploy Image to AWS ECR

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Pushing the Deploy Image ($ECR_FULL_DEPLOY)"
echo "-----------------------------------------------------------------------------"
echo ""

# Authenticate with AWS ECR
eval $(aws ecr get-login --no-include-email --region us-east-1)

# Push the image to the repo
docker push "$ECR_FULL_DEPLOY"
