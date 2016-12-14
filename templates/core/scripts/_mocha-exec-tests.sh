#!/bin/bash

# This script will execute the unit tests for this project.

echo ""
echo "Running project tests"
echo "---------------------------"
echo ""

# Ensure proper directory
cd /project

# Run the tests with the console renderer
mocha

# Run the tests with the html renderer
#mkdir -p ./doc/tests
#mocha --reporter doc > doc/tests/index.html

