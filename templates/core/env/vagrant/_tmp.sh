#!/bin/bash

# This file can be used when testing Provisioning steps; you can
# manually add calls to `exec_github_script` at the bottom of this
# file and execute this file with:
#
#     > cd /project
#     > /project/env/vagrant/tmp.sh
#

# Define script location
PROVISION_SCRIPT_ROOT="/project/env/vagrant"

# Settings
GITHUB_SCRIPT_USER="vmadman"
GITHUB_SCRIPT_REPO="linux-scripts"
GITHUB_SCRIPT_BRANCH="master"
GITHUB_SCRIPT_PATH="vagrant/centos7/dev/v1"

# Include the GitHub Execution Helper
source "$PROVISION_SCRIPT_ROOT/github-exec.sh"

# Run Test Scripts from GitHub Files..
# exec_github_script "some-install-step-here"