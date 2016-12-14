#!/bin/bash



# This script is executed by Vagrant each time the machine is booted.
# On the first boot it will run immediately after provision.sh.



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
exec_github_script "mlocate-update-db"
