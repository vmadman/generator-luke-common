/**
 * This is a "partial" sub-generator that generates a very basic and generic
 * `package.json` file for the project.
 *
 * @partial
 * @promptsFor projectName, projectDesc, projectVersion, fullName
 * @promptsFor emailAddress, githubOwner, gitRepoName
 * @example
 * $ yo luke:package
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

			// Show user prompts
			me._showPrompts(

				// Prompts from the base generator
				[ "projectName", "projectDesc", "projectVersion", "fullName", "emailAddress", "githubOwner", "gitRepoName" ],

				// Additional, custom, prompts
				[],

				// Callback function
				me.async()

			);

		},

		// Note: This generator intentionally uses the "conflicts" priority,
		// instead of the typical "writing" priority, so that it is executed
		// and its files are created AFTER all or most of the others, since
		// generators executed along side this one may need to influence the
		// package.json content.
		//   - See: http://yeoman.io/authoring/running-context.html
		conflicts : {

			createPartialFiles : function() {

				var me = this;
				var licenseString = "UNLICENSED";
				var dependencyMapping = [
					{
						objectType: "npm-dependency",
						packageProperty: "dependencies"
					},{
						objectType: "npm-dev-dependency",
						packageProperty: "devDependencies"
					}
				];

				// Determine License
				if( me._isIncluded("luke:mit-license") ) {
					licenseString = "MIT";
				}


				// Build package.json
				var pkg = {
					name          : me.props.parsedProject,
					version       : me.props.projectVersion,
					description   : me.props.projectDesc,
					main          : "lib/index.js",
					license       : licenseString,
					repository    : "https://github.com/" + me.props.parsedGitHubOwner + "/" + me.props.parsedRepoName,
					author        : {
						name  : me.props.fullName,
						email : me.props.emailAddress,
						url   : ""
					},
					contributors  : [
						{
							name  : me.props.fullName,
							email : me.props.emailAddress,
							url   : ""
						}
					],
					publishConfig : {
						registry : "https://registry.npmjs.org/"
					},
					keywords      : []
				};

				// Check to see if this composition includes "scripts"
				if( me._isIncluded("luke:scripts") ) {

					// Iterate over each NPM script meta-object
					_.each( me._getSharedObjects("script"), function( obj ) {

						var cfg = obj.config;

						if( pkg.scripts === undefined ) {
							pkg.scripts = {};
						}

						pkg.scripts[ cfg.name ] = "./" + cfg.dest;

					});

				}

				// Handle deps and dev-deps
				_.each( dependencyMapping, function( depInfo ) {

					var objType = depInfo.objectType;
					var pkgProp = depInfo.packageProperty;

					// Iterate over each NPM dependency meta-object
					_.each( me._getSharedObjects( objType ), function( obj ) {

						var cfg = obj.config;

						if( pkg[ pkgProp ] === undefined ) {
							pkg[ pkgProp ] = {};
						}

						pkg[ pkgProp ][ cfg.module ] = cfg.version;

					});

				});

				/** @creates generated:package.json **/
				me.fs.writeJSON( me.destinationPath( "package.json" ), pkg, null, "\t" );

			}
		}

	}
);
