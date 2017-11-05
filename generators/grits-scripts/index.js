/**
 * Sets up the basic npm run scripts for Grits.js projects.
 *
 * @partial
 * @uses pm2, scripts
 * @example
 * $ yo luke:grits-scripts
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

			me.composeWith("luke:pm2");
			me.composeWith("luke:scripts");

		},

		default : {

			createSharedMetaObjects: function() {

				var me = this;

				// Add an npm script for running grits on travis
				// todo: is this complete?
				me._createSharedObject(
					"script", "grits/xx/xx.sh", {
						name : "grits-xx",
						src  : "grits/scripts/grits/render/_ci.sh",
						dest : "scripts/grits/render/ci.sh"
					}
				);

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				/** @creates static:grits/scripts/grits/_vars.sh->scripts/grits/_vars.sh **/
				me.fs.copy(
					me.templatePath( "grits/scripts/grits/_vars.sh" ), me.destinationPath( "scripts/grits/_vars.sh" )
				);

			}
		}

	}
);
