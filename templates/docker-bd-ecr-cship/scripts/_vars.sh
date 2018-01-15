#!/bin/bash

# This script contains common script variables.

# These are specific to this project/application:
ECR_IMAGE_NAME="<%= dockerImageName %>"
ECR_BASE_TAG="base"
ECR_DEPLOY_TAG="latest"
CONTAINERSHIP_APPLICATION="<%= dockerImageName %>"

# ---

# These are specific to C2C, and will usually
# be the same for most project and applications.

# AWS: Basic Settings
AWS_CUSTOMER_ID="<%= awsCustomerId %>"

# AWS: ECR: Settings
ECR_NAMESPACE="<%= ecrNamespace %>"

# Containership: Organization Settings
CONTAINERSHIP_ORG_ID="<%= containershipOrgId %>"
CONTAINERSHIP_API_KEY="<%= containershipApiKey %>"

# Containership: Cluster Settings
CONTAINERSHIP_CLUSTER_ID="<%= containershipClusterId %>"

# ---

# These variables are combined using information
# provided by the variables defined above (derived).
# They'll likely not need to change unless
# civilization has collapsed.

# AWS ECR
ECR_HOSTNAME="$AWS_CUSTOMER_ID.dkr.ecr.us-east-1.amazonaws.com"
ECR_SHORT_BASE="$ECR_IMAGE_NAME:$ECR_BASE_TAG"
ECR_SHORT_DEPLOY="$ECR_IMAGE_NAME:$ECR_DEPLOY_TAG"
ECR_FULL_BASE="$ECR_HOSTNAME/$ECR_NAMESPACE/$ECR_IMAGE_NAME:$ECR_BASE_TAG"
ECR_FULL_DEPLOY="$ECR_HOSTNAME/$ECR_NAMESPACE/$ECR_IMAGE_NAME:$ECR_DEPLOY_TAG"

# Dev / Misc
DOCKER_TEST_CONTAINER="$ECR_IMAGE_NAME-test"
