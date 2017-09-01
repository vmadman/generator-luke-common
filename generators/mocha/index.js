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
						src  : "core/scripts/test/_run-unit-tests.sh",
						dest : "scripts/test/run-unit-tests.sh"
					}
				);

				// Add Mocha as a devDependency
				me._createSharedObject(
					"npm-dev-dependency", "mocha", {
						module   : "mocha",
						version  : "^2.4.5"
					}
				);

				// Chai is also a given ..
				me._createSharedObject(
					"npm-dev-dependency", "chai", {
						module   : "chai",
						version  : "^3.5.0"
					}
				);

				// Tipe is also useful in unit tests ..
				me._createSharedObject(
					"npm-dev-dependency", "tipe", {
						module   : "tipe",
						version  : "^0.1.12"
					}
				);

			}

		},

		writing : {

			createPartialFiles : function() {

				var me = this;

				// scripts/test/_test-and-wait.sh
				me.fs.copy(
					me.templatePath( "core/scripts/test/_test-and-wait.sh" ), me.destinationPath( "scripts/test/_test-and-wait.sh" )
				);

				// Since the unit testing setup for various projects
				// can be radically different, I am disabling the testing
				// scaffold, below, in favor of project-type-specific scaffolds.

				/*
				// test/index.js
				me.fs.copy(
					me.templatePath( "core/test/_mocha-index.js" ), me.destinationPath( "test/index.js" )
				);

				// test/lib/util.js
				me.fs.copy(
					me.templatePath( "core/test/lib/_util.js" ), me.destinationPath( "test/lib/util.js" )
				);
				*/

			}

		}

	}
);
