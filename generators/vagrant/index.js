/**
 * This is a "partial" sub-generator that generates a very basic Vagrantfile
 * and provision configuration for the project.
 *
 * @example
 * shell> yo luke:vagrant
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman        = require( "yeoman-generator" );
var baseGenerator = require( "../_BaseGenerator" );
var _             = require( "lodash" );

module.exports = baseGenerator.extend(
	{

		initializing : function() {

			// Locals
			var me = this;

			// Compose
			//me.composeWith("luke:env-dir");

			// Initialize the base generator
			//me._initBase();

		},

		prompting : function() {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

			// Show user prompts
			me._showPrompts(

				// Prompts from the base generator
				[ "projectName" ],

				// Additional, custom, prompts
				[{
					type        : "input",
					name        : "vagrantPortStart",
					message     : "What is the starting range for Vagrant port mapping?",
					default     : _.random(3000, 6000, false),
					cacheMode	: "prefer-cache",
					askAgain	: false
				},{
					type        : "input",
					name        : "vagrantPortCount",
					message     : "How many ports should be mapped to Vagrant?",
					default     : 3,
					cacheMode	: "prefer-cache",
					askAgain	: false
				}],

				// Callback function
				me.async()

			);

		},

		_getVagrantPorts: function() {

			var me = this;
			var portStart = parseInt( me.props.vagrantPortStart, 10 );
			var portCount = parseInt( me.props.vagrantPortCount, 10 );
			var ret = [];

			// Do not expose any ports if the start or count is invalid or zero..
			if( _.isNaN( portStart ) || portStart === 0 ) {
				return ret;
			}
			if( _.isNaN( portCount ) || portCount === 0 ) {
				return ret;
			}

			// Create an array of port numbers
			_.times( portCount, function( portIndex ) {
				var portNum = portStart + portIndex;
				ret.push( portNum );
			});

			// Finished
			return ret;

		},

		_getProvisioningSteps: function() {

			var me = this;
			var ret = [];

			/*
			Implementation example:
			-----------------------------
			me._createSharedObject(
				"vagrant-provision-step", "some-unique-name", {
					script : "the-actual-script-name.sh"
				}
			);
			*/

			// Iterate over each NPM script meta-object
			_.each( me._getSharedObjects("vagrant-provision-step"), function( obj ) {

				var cfg = obj.config;
				ret.push( cfg.script );

			});

			return ret;

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// Static Files ------------------------------------------------

				var staticFilenames = [
					"always.sh", "github-exec.sh",
					"README.md", "tmp.sh"
				];

				_.each( staticFilenames, function( fn ) {

					console.log("\n\n--> " + fn);
					me.fs.copy(
						me.templatePath( "core/env/vagrant/_" + fn ), me.destinationPath( "env/vagrant/" + fn )
					);

				});

				// The 'project' directory ..
				me.fs.copy(
					me.templatePath( "core/env/vagrant/project/_README.md" ), me.destinationPath( "env/vagrant/project/README.md" )
				);


				// Dynamic Files -----------------------------------------------

				// Vagrantfile
				me.fs.copyTpl(
					me.templatePath( "core/_Vagrantfile" ), me.destinationPath( "Vagrantfile" ), {
						name : me.props.parsedProject,
						portMappings: me._getVagrantPorts()
					}
				);

				// provision.sh
				me.fs.copyTpl(
					me.templatePath( "core/env/vagrant/_provision.sh" ), me.destinationPath( "env/vagrant/provision.sh" ), {
						steps: me._getProvisioningSteps()
					}
				);

			}
		}

	}
);
