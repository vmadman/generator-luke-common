#!/bin/bash

# This script can be used to execute the local docker image for testing purposes.
# Before executing this script you should build the local 'base image' by
# using the appropriate `npm run` command (i.e. `npm run base:build`).

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Executing the Base Image ($ECR_SHORT_BASE)"
echo ""
echo "    - with Bash shell"
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
	-ti \
	--rm \
	--name "$DOCKER_TEST_CONTAINER" \
	--entrypoint "/bin/bash" \
	"$ECR_FULL_BASE" \
	&& true

# *Set entrypoint to /bin/ash for Alpine containers