/**
 * Adds Bower configurations to a project.
 *
 * @partial
 * @operation Adds a Vagrant provisioning step: `npm-install-bower`
 * @promptsFor projectName, fullName, emailAddress, bowerComponentsPath
 * @example
 * $ yo luke:bower
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman        = require( "yeoman-generator" );
var baseGenerator = require( "../_BaseGenerator" );
var _             = require( "lodash" );
var PATH		  = require( "path" );

module.exports = baseGenerator.extend(
	{
		prompting : function() {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

			// Show user prompts
			me._showPrompts(

				// Prompts from the base generator
				[ "projectName", "fullName", "emailAddress" ],

				// Additional, custom, prompts
				[{
					type        : "input",
					name        : "bowerComponentsPath",
					message     : "Where should Bower components be installed?",
					default     : "src/third-party/bower",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}],

				// Callback function
				me.async()

			);

		},

		configuring: {

			addProvisioningSteps: function() {

				var me = this;

				// Add a provisioning step to install Bower
				me._createSharedObject(
					"vagrant-provision-step", "install-bower", {
						script : "npm-install-bower"
					}
				);

			}

		},

		// Note: This generator intentionally uses the "conflicts" priority,
		// instead of the typical "writing" priority, so that it is executed
		// and its files are created AFTER all or most of the others, since
		// generators executed along side this one may need to influence the
		// bower.json content.
		//   - See: http://yeoman.io/authoring/running-context.html
		conflicts : {

			createPartialFiles : function() {

				var me = this;
				var bowerDir = _.trim( me.props.bowerComponentsPath, " /\\" );
				bowerDir = bowerDir.replace( /\\/g, "/");
				bowerDir = bowerDir.replace( /\/+/g, "/");

				/** @creates template:core/_bower.json->bower.json **/
				me.fs.copyTpl(
					me.templatePath( "core/_bower.json" ), me.destinationPath( "bower.json" ), {
						name   : me.props.parsedProject,
						author : me.props.fullName,
						email  : me.props.emailAddress
					}
				);

				/** @creates template:core/_bowerrc.json->.bowerrc **/
				me.fs.copyTpl(
					me.templatePath( "core/_bowerrc.json" ), me.destinationPath( ".bowerrc" ), {
						path   : bowerDir
					}
				);

				/** @creates template:core/_bower-readme.md->{bowerComponentsPath}/README.md **/
				me.fs.copy(
					me.templatePath( "core/_bower-readme.md" ), me.destinationPath( bowerDir + "/README.md" )
				);

			}
		}

	}
);
