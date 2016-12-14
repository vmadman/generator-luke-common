#!/bin/bash



# This script is executed by Vagrant during provisioning (which happens
# only once, whenever a new VM is created, or when manually executed).


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
exec_github_script "yum-install-git"
exec_github_script "yum-install-node-js"
exec_github_script "npm-install-yeoman"
exec_github_script "npm-create-global-link"
exec_github_script "gem-install-travis-cli"

#exec_github_script "npm-install-pm2"
#exec_github_script "npm-install-livereloadx"
#exec_github_script "npm-install-grunt-cli"
#exec_github_script "npm-create-dep-symlink"
#exec_github_script "npm-install-deps"
#exec_github_script "gem-install-travis-cli"

# Project Specific Scripts
#"$PROVISION_SCRIPT_ROOT/do-something.sh"
