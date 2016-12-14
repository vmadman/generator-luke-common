/**
 * This is a "partial" sub-generator that generates standard JS meta files.
 *
 * @example
 * shell> yo luke:js
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

		writing : {

			createPartialFiles : function() {

				var me = this;

				// .eslintrc
				me.fs.copy(
					me.templatePath( "core/_eslintrc" ), me.destinationPath( ".eslintrc" )
				);
				
			}
		}

	}
);
