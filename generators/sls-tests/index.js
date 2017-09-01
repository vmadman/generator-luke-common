/**
 * This is a "partial" sub-generator that provides some basic testing
 * presets and libraries for unit testing Serverless endpoints.
 *
 * @example
 * shell> yo luke:sls-tests
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2017-08-31
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
			me.composeWith("luke:mocha");

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

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// test/lib/util.js
				me.fs.copy(
					me.templatePath( "serverless/test/lib/_util.js" ), me.destinationPath( "test/lib/util.js" )
				);

			}

		}

	}
);
