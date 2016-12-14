/**
 * This is a "partial" sub-generator that generates a very minimal skeleton
 * for unit testing via Mocha and Chai.
 *
 * @example
 * shell> yo luke:mocha
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman        = require( "yeoman-generator" );
var baseGenerator = require( "../_BaseGenerator" );
var _             = require( "lodash" );

module.exports = baseGenerator.extend(
	{

		initializing : function() {

			// Locals
			var me = this;

			// Compose
			me.composeWith("luke:test-dir");

		},

		prompting : function() {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

		},

		default : {

			createSharedMetaObjects: function() {

				var me = this;

				// Add an npm script for running Mocha
				me._createSharedObject(
					"script", "test.sh", {
						name : "test",
						src  : "core/scripts/_mocha-exec-tests.sh",
						dest : "scripts/test.sh"
					}
				);

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// test/index.js
				me.fs.copy(
					me.templatePath( "core/test/_mocha-index.js" ), me.destinationPath( "test/index.js" )
				);

				// test/lib/util.js
				me.fs.copy(
					me.templatePath( "core/test/lib/_util.js" ), me.destinationPath( "test/lib/util.js" )
				);

			}

		}

	}
);
