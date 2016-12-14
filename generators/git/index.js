/**
 * This is a "partial" sub-generator that generates a few standard GIT meta files.
 *
 * @example
 * shell> yo luke:git
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

				// .gitignore
				me.fs.copy(
					me.templatePath( "core/_gitignore" ), me.destinationPath( ".gitignore" )
				);

				// .gitattributes
				me.fs.copy(
					me.templatePath( "core/_gitattributes" ), me.destinationPath( ".gitattributes" )
				);


			}

		}

	}
);
