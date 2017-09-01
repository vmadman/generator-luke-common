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

		default : {

			createSharedMetaObjects: function() {

				var me = this;

				// You can't trust a man that doesn't lodash..
				me._createSharedObject(
					"npm-dependency", "lodash", {
						module   : "lodash",
						version  : "^4.17.4"
					}
				);

				// .. and everyone needs a BlueBird.
				me._createSharedObject(
					"npm-dependency", "bluebird", {
						module   : "bluebird",
						version  : "^3.3.5"
					}
				);

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// .eslintrc
				me.fs.copy(
					me.templatePath( "core/_eslintrc" ), me.destinationPath( ".eslintrc" )
				);

				// typedefs.js
				me.fs.copy(
					me.templatePath( "core/_typedefs.js" ), me.destinationPath( "typedefs.js" )
				);

			}
		}

	}
);
