/**
 * This is a "partial" sub-generator that attaches a proprietary license.
 *
 * @example
 * shell> yo luke:proprietary-license
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2017-08-31
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
				["copyrightHolder"],

				// Additional, custom, prompts
				[],

				// Callback function
				me.async()

			);

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// LICENSE.MD
				me.fs.copyTpl(
					me.templatePath( "core/_PROPRIETARY-LICENSE.md" ), me.destinationPath( "LICENSE.md" ), {
						year   : new Date().getFullYear(),
						owner  : me.props.copyrightHolder
					}
				);

			}
		}

	}
);
