#!/bin/bash

# This script can be used to execute the local docker image for testing purposes.
# Before executing this script you should build the local 'deploy image' by
# using the appropriate `npm run` command (i.e. `npm run deploy:build`).

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Executing the Deploy Image ($ECR_SHORT_DEPLOY)"
echo ""
echo "    - in the foreground"
echo "    - without config directory mapping"
echo ""
echo "---------------------------------------------------------"
echo ""
echo ""

echo "Stopping any running containers for '$DOCKER_TEST_CONTAINER'."
docker stop "$DOCKER_TEST_CONTAINER" 2>/dev/null

echo "Removing any existing containers for '$DOCKER_TEST_CONTAINER'."
docker rm "$DOCKER_TEST_CONTAINER" 2>/dev/null

docker run \
	--rm \
	--name "$DOCKER_TEST_CONTAINER" \
	--cap-add=IPC_LOCK \
	"$ECR_FULL_DEPLOY" \
	server

exit 0
# 	-ti \
