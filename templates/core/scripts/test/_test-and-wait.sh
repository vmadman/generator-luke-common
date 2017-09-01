#!/bin/bash


# -
# This script is a simple extension of 'run-unit-tests.sh'; all it does is add
# an infinite, blocking, sleep/wait after the tests have run so that the script
# never terminates.  The point is to allow execution and source watching via
# PM2 for continuous testing during development.
#
# You should never need to run this script directly.
# -

# Include (source) local.sh ..
MY_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$MY_SCRIPT_PATH/run-unit-tests.sh"

# Now we wait ..
echo "-> Tests complete, waiting for source updates .."
sleep infinity
