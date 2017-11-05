/**
 * A partial that creates a basic `README.md` with a generic message/description.
 *
 * @partial
 * @promptsFor projectName, projectDesc
 * @example
 * $ yo luke:readme
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

			// Show user prompts
			me._showPrompts(

				// Prompts from the base generator
				[ "projectName", "projectDesc" ],

				// Additional, custom, prompts
				[],

				// Callback function
				me.async()

			);

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				/** @creates template:core/_README.md->README.md **/
				me.fs.copyTpl(
					me.templatePath( "core/_README.md" ), me.destinationPath( "README.md" ), {
						name : me.props.projectName,
						desc : me.props.projectDesc
					}
				);

			}
		}

	}
);
