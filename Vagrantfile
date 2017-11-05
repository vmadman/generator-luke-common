# The VM name.
# ---------------------
# This is often set automatically as the name of the
# the project root directory, but you can freely change it.

$vmName		= "generator-luke"



# Instance Settings
# ---------------------
# This setting can be used to make this instance unique
# if you have more than one instance of this project
# on your machine.  Usually, though, this can be left as its default.

$instanceName	= "project"



# VM Performance Settings
# ---------------------
# These variables determine the resources given to VM.  These resources
# are often provided at the expense of the host (your PC) so you may need
# to reduce the values if Vagrant is slowing down your PC.  On the other hand,
# if your VM is resource intensive or is running slow, and if your PC can afford
# to give the VM a little more, then you can increase the values below.

$vmMemory	= "4096"
$vmCpus		= "4"



# Base Box Settings
# ---------------------
# These settings are used below in the section titled "Base Box Configuration".
# Vagrant VMs are created using existing images.  The settings below
# tell Vagrant about the base image for this Vagrant VM.  You can edit
# the default settings by changing the variables above.

$lBoxBuild      = "7.1"
$lBoxFile       = "vagrant-centos-#{$lBoxBuild}.box"
$lBoxUrl        = "https://github.com/CommanderK5/packer-centos-template/releases/download/0.#{$lBoxBuild}/#{$lBoxFile}"

# Vagrant Config Block
# ---------------------
Vagrant.configure("2") do |config|

	# The VM Hostname (Configured Above)
	# VM Hostname
	# ---------------------
	# One of Vagrant's useful functions is the automatic configuration
	# of the VMs network settings, including its hostname.  This makes
	# the whole VM networking concern decisively easy.  The setting
	# below specifies the machine's hostname, which is concatenated
	# (by default) using a few variables from above.

	config.vm.hostname  = "#{$vmName}.#{$instanceName}.local"



	# Base Box Configuration
	# ---------------------
	# Vagrant VMs are created using existing images.  The settings below
	# tell Vagrant about the base image for this Vagrant VM.  You can edit
	# the default settings by changing the variables above.

	config.vm.box       = $lBoxFile
	config.vm.box_url   = $lBoxUrl



	# Basic VM Config
	# ---------------------
	# This sets some very basic information for the VM.  Most of the settings
	# are configured as variables above.

	config.vm.provider :virtualbox do |vb|
		vb.customize ["modifyvm", :id, "--memory", $vmMemory, "--name", "Project VM - #{$vmName}.#{$instanceName}.local", "--cpus", $vmCpus]
	end



	# Port Forwarding
	# ---------------------
	# Port forwarding allows you to access the vagrant vm using "localhost"
	# on the host (your PC).  For example, if the "guest" port of 3000
	# is mapped to the host port of 8080, then you can access the guest
	# by via "localhost:8080" (or, in the case of http, http://localhost:8080/).
	# Some defaults are provided below, but you can add as many as you'd like
	# (or move/modify the defaults as you see fit).  The only thing you need
	# to be careful of is port conflicts, which will cause "vagrant up" to fail,
	# but its easily fixed.

	# a) Standard Web Port
	#    Port 80 on the VM will be accessible on the host at: localhost:8080

		# config.vm.network :forwarded_port, guest: 80,   host: 8080

	# b) Additional, Arbitrary Ports
	#    The following ports are mapped by default just so you'll have a few
	#    ports at your disposal and perhaps won't have to reload your
	#    Vagrant VM just to remap ports.

		config.vm.network :forwarded_port, guest: 3610, host: 3610



	# Folder Mappings
	# ---------------------
	# Folder mappings allow you to map folders on the Vagrant box to folders
	# on your PC (aka the "host").  You can add as many as you'd like, but the
	# default mapping will put a directory in the vagrant box at "/project"
	# that is mapped to the directory that contains this Vagrantfile.

	config.vm.synced_folder "./", "/project"



	# Provision Script
	# ---------------------
	# This script is only execute automatically one time (during initial provisioning).
	# However, it can be manually executed in various ways, if needed.
	# For more information, see these documentation links:
	#   - https://docs.vagrantup.com/v2/provisioning/basic_usage.html
	#   - https://docs.vagrantup.com/v2/provisioning/shell.html

	config.vm.provision "shell" do |s|
		s.path = "env/vagrant/provision.sh"
	end



	# Always Script
	# ---------------------
	# This script is executed each time "vagrant up" or "vagrant reload" is called.
	# For more information, see these documentation links:
	#   - https://docs.vagrantup.com/v2/provisioning/basic_usage.html
	#   - https://docs.vagrantup.com/v2/provisioning/shell.html

	config.vm.provision "shell", run: "always" do |s|
		s.path = "env/vagrant/always.sh"
	end



	# Vagrant Key
	# ---------------------
	# Disable automatic key-pair replacement for Vagrant insecure key.
	# By convention, most Vagrant boxes are shipped with an initial user, "vagrant".
	# Likewise, the vagrant user usually comes pre-loaded with a publicaly available
	# default key pair.  However, recently Vagrant added logic to automatically
	# replace this key by default.  We dislike that idea, so we prevent it.

	config.ssh.insert_key = false

end
