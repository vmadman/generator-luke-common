/**
 * This is a "partial" sub-generator that provides an editor
 * configuration (.editorconfig).
 *
 * @example
 * shell> yo luke:editor
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

				// .editorconfig
				me.fs.copy(
					me.templatePath( "core/_editorconfig" ), me.destinationPath( ".editorconfig" )
				);

			}
		}

	}
);
