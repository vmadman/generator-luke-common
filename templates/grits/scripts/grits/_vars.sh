#!/bin/bash

# Find scripts directory
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

# Find node executable
NODE_PATH="$(which node)"

# Resolve absolute path to grits script
GRITS_SCRIPT="$PROJECT_DIR/node_modules/grits/bin/grits.js"

# Execute Grits.js with parameters
#
# Examples:
#    run_grits "--version"
#    run_grits "-w" "--sassi" "/some/sassi"
run_grits() {

    local oneGritsArg allGritsArgs=()
    for oneGritsArg; do allGritsArgs+=("$oneGritsArg"); done

	"$NODE_PATH" "$GRITS_SCRIPT" "${allGritsArgs[@]}"

}
