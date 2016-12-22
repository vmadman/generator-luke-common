/**
 * This is a "partial" sub-generator that generates the /scripts directory.
 *
 * @example
 * shell> yo luke:scripts
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman        = require( "yeoman-generator" );
var baseGenerator = require( "../_BaseGenerator" );
var _             = require( "lodash" );

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

				// scripts/README.md
				me.fs.copy(
					me.templatePath( "core/scripts/_README.md" ), me.destinationPath( "scripts/README.md" )
				);

			}
		},

		// Note: This generator intentionally uses the "conflicts" priority,
		// for the writing of script files, instead of the typical "writing"
		// priority, so that it is executed and its files are created AFTER all
		// or most of the others, since generators executed along side this one
		// may need to influence which scripts will be created and their
		// content. - See: http://yeoman.io/authoring/running-context.html
		conflicts : {

			writeNpmScripts : function() {

				var me = this;

				// Iterate over each script that needs to be created..
				_.each( me._getSharedObjects("script"), function( obj ) {

					var cfg = obj.config;

					/*
					me.fs.copy(
						me.templatePath( cfg.src ), me.destinationPath( cfg.dest )
					);
					*/

					me.fs.copyTpl(
						me.templatePath( cfg.src ), me.destinationPath( cfg.dest ), cfg
					);

				});

			}
		}

	}
);
