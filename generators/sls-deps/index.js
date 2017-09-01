/**
 * This is a "partial" sub-generator that adds the basic dependencies needed
 * to create basic Serverless services.
 *
 * @example
 * shell> yo luke:sls-deps
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

		},

		default : {

			createSharedMetaObjects: function() {

				var me = this;

				// Add sls-tools as a dependency
				me._createSharedObject(
					"npm-dependency", "sls-tools", {
						module   : "@c2cs/sls-tools",
						version  : "^0.2.1"
					}
				);

				// Also add a number of dev dependencies
				me._createSharedObject(
					"npm-dev-dependency", "serverless-offline", {
						module   : "serverless-offline",
						version  : "^3.14.2"
					}
				);
				me._createSharedObject(
					"npm-dev-dependency", "serverless-apigateway-plugin", {
						module   : "@c2cs/serverless-apigateway-plugin",
						version  : "^0.2.9"
					}
				);
				me._createSharedObject(
					"npm-dev-dependency", "serverless-subscription-plugin", {
						module   : "@c2cs/serverless-subscription-plugin",
						version  : "latest"
					}
				);
				me._createSharedObject(
					"npm-dev-dependency", "test-helper", {
						module   : "@c2cs/test-helper",
						version  : "^0.2.1"
					}
				);


			}

		}

	}
);
