#!/bin/bash

# This script uses the ContainerShip CLI to fetch and display the current
# status of the application and its containers.

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Fetching App info from Containership"
echo "------------------------------------"
echo ""

# Query CS
cs app show "$CONTAINERSHIP_APPLICATION"


echo ""
echo ""