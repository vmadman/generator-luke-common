#!/bin/bash

# This script will check the Git commit message of the last commit being
# built in this job and if the string "[rebuild base]" is found anywhere
# in the message, then it will trigger a build and push of the base-image.
#
# Important: This script only, ever, be executed within Travis-CI.
#

if [[ "$TRAVIS_COMMIT_MESSAGE" =~ "[rebuild base]" ]]; then

    echo " "
    echo "=== Base Image Rebuild ==========================="
    echo " "
    echo "  Found '[rebuild base]' in the commit message."
    echo "  The base image will be rebuilt..."
    echo " "
    echo "=================================================="
    echo " "

    npm run base:build
    npm run base:push

else

    echo " "
    echo "=== Base Image Rebuild ================================="
    echo " "
    echo "  Did not find '[rebuild base]' in the commit message."
    echo "  The base image will NOT be rebuilt..."
    echo " "
    echo "======================================================="
    echo " "

fi

