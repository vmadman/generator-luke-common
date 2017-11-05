/**
 * This is a "partial" sub-generator that attaches a standard MIT license.
 *
 * @partial
 * @promptsFor fullName
 * @example
 * $ yo luke:mit-license
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
				[ "fullName" ],

				// Additional, custom, prompts
				[],

				// Callback function
				me.async()

			);

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				/** @creates template:core/_MIT-LICENSE.md->LICENSE.md **/
				me.fs.copyTpl(
					me.templatePath( "core/_MIT-LICENSE.md" ), me.destinationPath( "LICENSE.md" ), {
						year   : new Date().getFullYear(),
						author : me.props.fullName
					}
				);

			}
		}

	}
);
