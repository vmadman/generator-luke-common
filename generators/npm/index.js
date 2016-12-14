/**
 * This is a "partial" sub-generator that generates a few standard NPM meta files.
 *
 * @example
 * shell> yo luke:npm
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman = require( "yeoman-generator" );
var baseGenerator = require("../_BaseGenerator");

module.exports = baseGenerator.extend(
	{
		prompting : function() {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

		},

		configuring: {

			addProvisioningSteps: function() {

				var me = this;

				// Add a provisioning step to install Node & NPM
				me._createSharedObject(
					"vagrant-provision-step", "install-node", {
						script : "yum-install-node-js"
					}
				);

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// .npmrc
				me.fs.copy(
					me.templatePath( "core/_npmrc" ), me.destinationPath( ".npmrc" )
				);

				// .npmignore
				me.fs.copy(
					me.templatePath( "core/_npmignore" ), me.destinationPath( ".npmignore" )
				);

			}
		}

	}
);
