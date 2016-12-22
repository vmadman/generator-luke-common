/**
 * This is a "partial" sub-generator that adds PM2 to the project.
 *
 * @example
 * shell> yo luke:pm2
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-22
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

			me.composeWith("luke:scripts");

		},

		configuring: {

			addProvisioningSteps: function() {

				var me = this;

				// Add provisioning steps to install PM2 & PM2 Web
				me._addVagrantStep("npm-install-pm2");
				me._addVagrantStep("npm-install-pm2-web");

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// example-app.json
				me.fs.copy(
					me.templatePath( "core/env/pm2/_example-app.json" ), me.destinationPath( "env/pm2/example-app.json" )
				);

			}
		}

	}
);
