/**
 * Generates a `.travis.yml` file with common options for Grits.js deployment.
 *
 * @partial
 * @uses package, grits-scripts
 * @example
 * $ yo luke:travis-grits
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

			me.composeWith("luke:package");
			me.composeWith("luke:grits-scripts");
			//me.composeWith("luke:grits-config");

		},

		default : {

			createSharedMetaObjects: function() {

				var me = this;

				// Add an npm script for running grits on travis
				me._createSharedObject(
					"script", "grits/render/ci.sh", {
						name : "grits-render-ci",
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
				// todo: move this to its own partial
				me.fs.copy(
					me.templatePath( "grits/scripts/grits/_vars.sh" ), me.destinationPath( "scripts/grits/_vars.sh" )
				);

				/** @creates static:grits/_travis.yml->.travis.yml **/
				me.fs.copy(
					me.templatePath( "grits/_travis.yml" ), me.destinationPath( ".travis.yml" )
				);

			}
		}

	}
);
