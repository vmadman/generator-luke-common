/**
 * This is a "partial" sub-generator that generates a [basically] empty
 * `/endpoints` directory. For the most part, this generator is used by other
 * generators (such as the sls-service generator), to ensure that the
 * `/endpoints` directory exists.
 *
 * @example
 * shell> yo luke:sls-endpoints-dir
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-08-31
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

				// endpoints/README.md
				me.fs.copy(
					me.templatePath( "serverless/endpoints/_README.md" ), me.destinationPath( "endpoints/README.md" )
				);

			}

		}

	}
);
