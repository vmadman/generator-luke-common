#!/bin/bash

# This script will execute the Mocha unit tests for this project.

# Resolve a few paths ..
MY_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MOCHA_PATH="$MY_SCRIPT_PATH/../../node_modules/mocha/bin"

# Tell the user what's up..
echo " "
echo "Running Unit Tests"
echo "------------------"
echo " "

# Execute Mocha
"/bin/node" "$MOCHA_PATH/mocha" --recursive --timeout 5000 test/*Test.js

# Add a bit of spacing at the end of the output
echo " "