#!/bin/bash

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Sending Update Request to Containership ($CONTAINERSHIP_APPLICATION)"
echo "-----------------------------------------------------------------------------"
echo ""

curl \
-X POST \
-H "Authorization: Bearer $CONTAINERSHIP_API_KEY" \
-H "Content-Type:application/json" \
-d '{
	"url": "/applications/'"$CONTAINERSHIP_APPLICATION"'",
	"method": "PUT",
	"data": {
		"image": "'"$ECR_FULL_DEPLOY"'"
	}
}' \
"https://api.containership.io/v2/organizations/$CONTAINERSHIP_ORG_ID/clusters/$CONTAINERSHIP_CLUSTER_ID/proxy" \
