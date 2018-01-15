#!/bin/bash

# This script uses the ContainerShip CLI to relaunch the application and its
# containers by scaling the application up and then back down again.

# Import common variables
source "./scripts/_vars.sh"

# Say Hello
echo ""
echo "Reloading App in Containership"
echo "------------------------------"
echo ""

# Scale up and down..
echo "  > Scaling down to zero containers..."
echo ""
cs app scale-down "$CONTAINERSHIP_APPLICATION" --count 0
echo ""
echo ""
echo "  > Scaling up to one container..."
echo ""
cs app scale-up "$CONTAINERSHIP_APPLICATION" --count 1
echo ""
echo ""

# Query CS
cs app show "$CONTAINERSHIP_APPLICATION"

echo ""
echo ""