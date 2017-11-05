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

# Node.js
exec_github_script "yum-install-node-js"
exec_github_script "create-npm-run-shortcut"

# Travis CLI
exec_github_script "gem-install-travis-cli"

# Yeoman
exec_github_script "npm-install-yeoman"

# Project Dependencies
exec_github_script "npm-install-deps-fresh"
exec_github_script "npm-create-global-link"

# Project Specific Scripts
#"$PROVISION_SCRIPT_ROOT/do-something.sh"










# -- legacy --





# Might be useful again one day...
#exec_github_script "npm-install-pm2"
#exec_github_script "npm-install-livereloadx"
#exec_github_script "npm-install-grunt-cli"


# ------------

# Yarn doesn't seem to work properly; generator-luke is not able to "link" ..

# -

# [vagrant@generator-luke tmp]$ yo luke
# Error luke
#
# You don't seem to have a generator with the name “luke” installed.
# But help is on the way:
#
# You can see available generators via npm search yeoman-generator or via http://yeoman.io/generators/.
# Install them with npm install generator-luke.
#
# To see all your installed generators run yo without any arguments. Adding the --help option will also show subgenerators.
#
# If yo cannot find the generator, run yo doctor to troubleshoot your system.

# -

# Yarn
#exec_github_script "yum-install-yarn"

# Yeoman
#exec_github_script "yarn-install-yeoman"

# Project Dependencies
#exec_github_script "yarn-install-deps-fresh"
#exec_github_script "yarn-create-global-link"