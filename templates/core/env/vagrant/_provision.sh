#!/bin/bash

# This script is executed by Vagrant during provisioning (which happens
# only once, whenever a new VM is created, or when manually executed).

# A list of all available scripts can be found here:
# - https://github.com/vmadman/linux-scripts/tree/master/vagrant/centos7/dev/v1

# Define script location
PROVISION_SCRIPT_ROOT="/project/env/vagrant"

# Settings
GITHUB_SCRIPT_USER="vmadman"
GITHUB_SCRIPT_REPO="linux-scripts"
GITHUB_SCRIPT_BRANCH="master"
GITHUB_SCRIPT_PATH="vagrant/centos7/dev/v1"

# Include the GitHub Execution Helper
source "$PROVISION_SCRIPT_ROOT/github-exec.sh"

# Run Several Scripts from GitHub Files..
exec_github_script "yum-update-cache"
exec_github_script "yum-install-common"
<% steps.forEach( function( scriptName ) { -%>
exec_github_script "<%= scriptName %>"
<% }); %>

# Project Specific Scripts
# "$PROVISION_SCRIPT_ROOT/project/some-script-here.sh"
