#!/bin/bash

# This helper script provides a function that loads scripts from a GitHub repo
# and executes them.  It goes without saying that the source repository must be
# trusted.
#
# Author: Luke Chavers <luke@chavers.io>
#

# Static Settings
GITHUB_BASE_URL="https://raw.githubusercontent.com"
GITHUB_SCRIPT_BASE="$GITHUB_BASE_URL/$GITHUB_SCRIPT_USER/$GITHUB_SCRIPT_REPO/$GITHUB_SCRIPT_BRANCH/$GITHUB_SCRIPT_PATH"

# Helper Function
function exec_github_script {

	GITHUB_SCRIPT_FILENAME="$1.sh"
	GITHUB_SCRIPT_RAW_URL="$GITHUB_SCRIPT_BASE/$GITHUB_SCRIPT_FILENAME"

	echo ""
	echo ""
	echo "-- Executing GitHub Script: $GITHUB_SCRIPT_FILENAME --"
	echo ""
	wget -q --retry-connrefused --tries=5 --waitretry=3 -O - "$GITHUB_SCRIPT_RAW_URL" | bash
	#wget --retry-connrefused --tries=5 --waitretry=3 -O - "$GITHUB_SCRIPT_RAW_URL" | bash

}
