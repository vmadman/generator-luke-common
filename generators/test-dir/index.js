/**
 * This is a "partial" sub-generator that generates a [basically] empty `/test`
 * directory. For the most part, this generator is used by other generators
 * (such as the mocha generator), to ensure that the `/test` directory exists.
 *
 * @example
 * shell> yo luke:test-dir
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

		// Note: This generator intentionally uses the "default" priority,
		// instead of the typical "writing" priority, so that it is executed
		// and its files are created before others that depend on them.
		//   - See: http://yeoman.io/authoring/running-context.html
		default : {

			createPartialFiles: function() {

				var me = this;

				// We only need to create these files once..
				if( me._hasRunBefore() ) {
					return;
				}

				// test/README.md
				me.fs.copy(
					me.templatePath( "core/test/_README.md" ), me.destinationPath( "test/README.md" )
				);

				// test/fixtures/README.md
				me.fs.copy(
					me.templatePath( "core/test/fixtures/_README.md" ), me.destinationPath( "test/fixtures/README.md" )
				);

			}

		}

	}
);
