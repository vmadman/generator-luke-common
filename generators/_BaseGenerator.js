/**
 * Yeoman generator for my projects.  This generator is the foundation
 * generator that all (or most) generators inherit from.  It sets up files
 * and variables that are applicable to ALL projects.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman 	= require( "yeoman-generator" );
var chalk 	= require( "chalk" );
var yosay 	= require( "yosay" );
var _ 		= require( "lodash" );
var fs      = require( "fs" );
var PATH    = require( "path" );

module.exports = yeoman.Base.extend(
	{

		/**
		 * Called by child generators
		 * @private
		 */
		_initBase: function() {

			this._initGlobalExecTracker();
			this._sayHello();
			this._setTemplateRoot();

		},

		/**
		 * Have Yeoman greet the user.
		 * @private
		 */
		_sayHello: function() {

			var me = this;

			// We only want to say hello once..
			if( me._isFirstRun() ) {

				me.log("");
				me.log(
					"[ Partial: " + chalk.green(this.options.namespace) + " ]"
				);

			}

		},

		/**
		 * Gets a property value from the project's package.json file, if the
		 * file exists and the property is defined.
		 *
		 * This method is often used within the 'derive' method of user
		 * prompts to allow them to defer to the package.json file for
		 * values when available.
		 *
		 * You can find usage examples of this method in `#_getBasePrompts()`.
		 *
		 * @param {string} propName The property name to read from package.json
		 * @returns {*} The value from the package.json file.
		 * @private
		 */
		_loadPackageValue: function( propName ) {

			var me = this;
			var pkg = me._loadPackageJson();
			var ret = null;

			switch( propName ) {

				case "author.name":
					if( pkg.author !== undefined
						&& pkg.author !== null
						&& typeof pkg.author === "object"
						&& pkg.author.name !== undefined
						&& pkg.author.name !== null
						&& pkg.author.name !== "" ) {
						
						ret = pkg.author.name;
						
					}
					break;

				case "author.email":
					if( pkg.author !== undefined
						&& pkg.author !== null
						&& typeof pkg.author === "object"
						&& pkg.author.email !== undefined
						&& pkg.author.email !== null
						&& pkg.author.email !== "" ) {

						ret = pkg.author.email;

					}
					break;
					
				case "github.owner":
					if( pkg.repository !== undefined
						&& pkg.repository !== null
						&& pkg.repository !== "" ) {

						var githubInfo = me._parseGitHubRepo( pkg.repository );
						ret = githubInfo.owner;

					}
					break;

				case "github.repo":
					if( pkg.repository !== undefined
						&& pkg.repository !== null
						&& pkg.repository !== "" ) {

						var githubInfo = me._parseGitHubRepo( pkg.repository );
						ret = githubInfo.repo;

					}
					break;

				default:

					if( pkg[ propName ] !== undefined &&
						pkg[ propName ] !== null &&
						pkg[ propName ] !== "" ) {
						ret = pkg[ propName ];
					}
					break;

			}

			// Cast to string
			if( ret !== null ) {
				ret += "";
			}

			// Return
			return ret;

		},

		/**
		 * Loads the package.json file from the project root, if it exists.
		 *
		 * @private
		 * @returns {object}
		 */
		_loadPackageJson: function() {

			var me = this;

			// We only need to load the package.json file once.
			if( me.$packageJson !== undefined ) {
				return me.$packageJson;
			}

			var projectRoot = me._getProjectRoot();
			var packageJsonPath = PATH.join( projectRoot, "package.json" );
			var pkg = {};

			try {
				pkg = require( packageJsonPath );
			} catch( err ) {
				// failed to load..
				// this will be ignored
			}

			me.$packageJson = pkg;
			return me.$packageJson;

		},

		/**
		 * Parses a GitHub repository URL and returns an object explaining
		 * its parts. If this method has any trouble processing the parts of the
		 * URL (as with an invalid GitHub URL), then NULL will be returned
		 * for all/most of the properties.
		 *
		 * @private
		 * @param {string} url A valid GitHub repository URL
		 * @returns {{_original: (string|*), httpsUrl: null, sshUrl: null, owner: null, repo: null}}
		 */
		_parseGitHubRepo: function( url ) {

			var me = this;
			var ret = {
				_original: url,
				httpsUrl: null,
				sshUrl: null,
				owner: null,
				repo: null
			};
			var spl, tmp;

			// Make lower case
			url = url.toLowerCase();

			// Check for URL type
			if( _.startsWith( url, "http" ) ) {

				// Parse an HTTP/HTTPS URL
				spl = url.split("/");

				if( spl[3] !== undefined ) {
					ret.owner = spl[3];
				}

				if( spl[4] !== undefined ) {
					ret.repo = spl[4];
				}

			} else if ( _.startsWith( url, "git" ) ) {

				// Parse an SSH URL
				if( url.indexOf(":") !== -1 ) {
					tmp = url.substr( url.indexOf(":") + 1 );
					tmp = _.trim( tmp );
					tmp = tmp.replace( /\.git$/ig, "" );
					spl = tmp.split("/");

					if( spl[0] !== undefined ) {
						ret.owner = spl[0];
					}

					if( spl[1] !== undefined ) {
						ret.repo = spl[1];
					}

				}
			}

			// Build/rebuild proper URLS
			if( ret.owner !== null && ret.repo !== null ) {

				ret.httpsUrl = "https://github.com/" + ret.owner + "/" + ret.repo;
				ret.sshUrl = "git@github.com:" + ret.owner + "/" + ret.repo + ".git";

			}
			return ret;

		},

		/**
		 * Returns the project root directory as an absolute path.
		 * (This is an alias for this.env.cwd)
		 *
		 * @private
		 * @returns {string} The project root directory as an absolute path.
		 */
		_getProjectRoot: function() {
			return this.env.cwd;
		},

		/**
		 * Returns the [static] "base" prompt data.  These are prompts that are common
		 * and used by many different sub-generators.
		 *
		 * @access private
		 * @returns {object[]} An array of prompt items
		 */
		_getBasePrompts: function() {

			var me = this;
			var appName = me._getKebabAppName();

			return [
				{
					type        : "input",
					name        : "projectName",
					message     : "What is the name of this project?",
					default     : appName,
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("name");
					}
				}, {
					type        : "input",
					name        : "projectDesc",
					message     : "Please describe this project:",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("description");
					}
				}, {
					type        : "input",
					name        : "projectVersion",
					message     : "What is the starting version for this project?",
					default     : "0.1.0",
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("version");
					}
				}, {
					type        : "input",
					name        : "fullName",
					message     : "What is your full name?",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("author.name");
					}
				}, {
					type        : "input",
					name        : "emailAddress",
					message     : "What is your email address?",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("author.email");
					}
				}, {
					type        : "input",
					name        : "githubOwner",
					message     : "Which GitHub user or organization owns the repo for this project?",
					default     : "github",
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("github.owner");
					}
				}, {
					type        : "input",
					name        : "gitRepoName",
					message     : "What is the name of this project's Git repository?",
					default     : appName,
					cacheMode	: "prefer-cache",
					askAgain	: false,
					derive      : function( promptData ) {
						return me._loadPackageValue("github.repo");
					}
				}, {
					type        : "input",
					name        : "copyrightHolder",
					message     : "Who is the intellectual property rights holder for this project?",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}
			];

		},

		/**
		 * Returns the automatically-derived application name
		 * as kebab case.
		 *
		 * @example
		 * console.log( _getKebabAppName() );
		 * // -> my-application
		 *
		 * @private
		 * @returns {string} The application name, in kebab case.
		 */
		_getKebabAppName: function() {

			let me = this;
			let ret = me.appname;
			ret = ret.toLowerCase();
			ret = _.kebabCase( ret );
			ret = _.trim( ret );
			return ret;

		},

		/**
		 * Sets up a store in the global context that is used by `#_hasRunBefore()`
		 * to determine if this generator has already been executed as part
		 * of another composition.
		 *
		 * @private
		 * @returns {void}
		 */
		_initGlobalExecTracker: function() {

			// Locals
			var me = this;
			var namespace;

			// Find the name of this generator
			namespace = me.options.namespace.toLowerCase();

			// Prevent duplicate executions of this method..
			if( me.$executionId !== undefined ) {
				return;
			}

			// Get a unique id for this generator/execution
			me.$executionId = _.uniqueId( namespace.replace(":", "-") + "-exec-");

			// Initialize the global store, if necessary
			if( global.$generatorExecTracker === undefined ) {
				global.$generatorExecTracker = {};
			}

			// Track the id of the FIRST execution of this generator in the global store
			if( global.$generatorExecTracker[ namespace ] === undefined ) {
				global.$generatorExecTracker[ namespace ] = me.$executionId;
			}

		},

		/**
		 * Checks to see if a provided namespace (generator name) has been included
		 * in the current composition.
		 *
		 * Important: This method only checks to see if a sub-generator (partial) is
		 * included in the current, active composition.  It does not check to see
		 * if the partial has ever been executed on the project.  For example,
		 * running "_isIncluded('test')" from "yo luke:mocha" will return TRUE,
		 * but running the same from "yo luke:scripts" will return FALSE.
		 *
		 * Todo: However, it is probably necessary that this logic be extended, eventually,
		 * to allow for checks against project history.  Upon doing so, though,
		 * additional logic for re-executing the dependency partial would be needed.
		 *
		 * @param {string} namespace The generator to check for, e.g. "luke:readme"
		 * @returns {boolean} TRUE if the provided generator/namespace is part of the
		 * current composition or FALSE if it is not.
		 * @private
		 */
		_isIncluded: function( namespace ) {

			namespace = namespace.toLowerCase();

			if( global.$generatorExecTracker[ namespace ] === undefined || global.$generatorExecTracker[ namespace ] === null ) {
				return false;
			} else {
				return true;
			}

		},

		/**
		 * Uses the global store created by `#_initGlobalExecTracker` to determine
		 * if this generator has already been executed as part of another 'composition'
		 * within this same session.  This is useful for preventing redundant executions
		 * when they are not necessary or if they could lead to conflicts and problems.
		 *
		 * @access private
		 * @returns {boolean} TRUE if this generator has already been executed, or FALSE
		 * if this is the first inclusion of this generator.
		 */
		_hasRunBefore: function() {

			// Locals
			var me = this;
			var namespace, execId, firstId;

			// Find the name of this generator
			namespace = me.options.namespace;

			// Ensure the global cache exists and is initialized for
			// this generator; the init function is idempotent.
			me._initGlobalExecTracker();

			// Load variables for comparison
			// .. my execution id ..
			execId = me.$executionId;

			// .. the id of this generators FIRST execution ..
			firstId = global.$generatorExecTracker[ namespace ];

			// If the two ids above match, then this is the first
			// execution of this generator.  If they are different,
			// then this is not the first time this generator has executed.
			if( execId === firstId ) {
				return false;
			} else {
				return true;
			}

		},

		/**
		 * This is a convenience alias for the INVERSE of the `#_hasRunBefore`
		 * method (above).
		 *
		 * @access private
		 * @returns {boolean} FALSE if this generator has already been executed, or TRUE
		 * if this is the first inclusion of this generator.
		 */
		_isFirstRun: function() {
			var me = this;
			return !me._hasRunBefore();
		},

		/**
		 * Override the template path
		 * (we use a common path in the project root)
		 * @private
		 */
		_setTemplateRoot: function() {
			this.sourceRoot( this.templatePath( "../../../templates" ) );
		},

		/**
		 * Returns a subset of the base prompt data from `#_getBasePrompts()`.
		 *
		 * @access private
		 * @param {string[]} basePromptRefs A list of prompts to use from the base prompt list
		 * @returns {object[]} An array of prompt items
		 */
		_getSpecificBasePrompts: function( basePromptRefs ) {

			var me = this;
			var ret = [];

			// We start with a list of the base prompts
			var basePrompts = me._getBasePrompts();

			// Handle null and undefined
			if( basePromptRefs === undefined || basePromptRefs === null ) {
				return ret;
			}

			// Select the base prompts
			_.each( basePromptRefs, function( bpRef ) {
				_.each( basePrompts, function( bpItem ) {
					if( bpItem.name === bpRef ) {
						ret.push( bpItem );
					}
				});
			});

			return ret;

		},

		/**
		 * Merges two arrays of prompt data together.
		 *
		 * @access private
		 * @param basePromptData
		 * @param additionalPromptData
		 * @returns {object[]}
		 */
		_mergePromptData: function( basePromptData, additionalPromptData ) {

			var me = this;
			var ret = basePromptData;

			// Append Child Prompts
			_.each( additionalPromptData, function(p) {
				ret.push(p);
			});

			return ret;

		},

		/**
		 * Sets prompt default values in Yeoman based on our proprietary
		 * prompt data format.
		 *
		 * @access private
		 * @param {object[]} promptData
		 */
		_setConfigDefaults: function( promptData ) {

			var me = this;
			var dvals = {};

			_.each( promptData, function(p) {
				dvals[p.name] = p.default;
			});
			me.config.defaults(dvals);

		},

		/**
		 * Finalizes the prompt data based on the information found in the
		 * `.yo-rc` configuration cache (if any exists).  If this generator is "partial",
		 * this method will also remove prompts that have already been asked,
		 * depending on the prompt's settings.
		 *
		 * This method, more-or-less, defers to `#_getFinalPromptForOne()`.
		 *
		 * @access private
		 * @param {object[]} promptData All prompt data
		 * @returns {object[]} The updated, and final, prompt data for all prompts.
		 */
		_getFinalPromptData: function( promptData ) {

			var me = this;
			var final = [];

			// Read user-level overrides file, if available..
			me._readUserPromptOverrides();

			// Send each prompt item to _getFinalPromptForOne
			_.each( promptData, function( pd ) {

				var res = me._getFinalPromptForOne( pd );
				if( res !== null ) {
					final.push( res );
				}

			});

			return final;

		},

		/**
		 * Finalizes the prompt data for a single prompt question based on the
		 * information found in the `.yo-rc` configuration cache (if any exists).
		 * If this generator is "partial", this method will also remove prompts
		 * that have already been asked, depending on the prompt's settings.
		 *
		 * @param {object} onePrompt Prompt data for a single prompt question
		 * @returns {object} The updated prompt data or NULL if the question should
		 * not be asked at all.
		 */
		_getFinalPromptForOne: function( onePrompt ) {

			var me = this;
			var cachedValue;
			var memoryValue;
			var fnDerive, derivedValue;

			// Apply default for 'cacheMode'
			if( onePrompt.cacheMode === undefined || onePrompt.cacheMode === undefined ) {
				onePrompt.cacheMode = "default-only";
			}

			// Apply default for 'cacheMode'
			if( onePrompt.askAgain === undefined || onePrompt.askAgain !== true ) {
				onePrompt.askAgain = false;
			}

			// Process derived values, such as those that can be
			// read from the `package.json` file.
			if( onePrompt.derive !== undefined && typeof onePrompt.derive === "function" ) {

				// Bind the derive function
				fnDerive = onePrompt.derive.bind( me );

				// Call the derive function
				derivedValue = fnDerive( onePrompt );

				// If the derive function returns NULL, we will skip,
				// otherwise we will use the derived value.
				if( derivedValue !== null ) {

					// Load the value from the cache
					me._overridePrompt( onePrompt, derivedValue );

					this.log(
						"Using " + chalk.magenta("derived") + " value for " + chalk.cyan( onePrompt.name ) + ": " + chalk.gray( derivedValue )
					);

					// .. and do not prompt the user ..
					return null;

				}

			}

			// Get the stored value from the configuration cache
			cachedValue = me.config.get( onePrompt.name );

			// If the value does not exist in the configuration cache, then
			// we can skip considerations of the cacheMode.
			if( cachedValue !== undefined ) {

				// The value was found in .yo-rc, the .cacheMode
				// setting will tell us what to do next.
				if( onePrompt.cacheMode.toLowerCase() === "prefer-cache" ) {

					// Load the value from the cache
					me._overridePrompt( onePrompt, cachedValue );

					this.log(
						"Using " + chalk.magenta(".yo-rc") + " value for " + chalk.cyan( onePrompt.name ) + ": " + chalk.gray( cachedValue )
					);

					// .. and do not prompt the user ..
					return null;

				}

				onePrompt.default = cachedValue;

			}

			// Check the user prompt overrides..
			if( global.$userPromptOverrides[ onePrompt.name ] !== undefined ) {

				cachedValue = global.$userPromptOverrides[ onePrompt.name ];

				// The value was found in .yo-rc.overrides.json, the .cacheMode
				// setting will tell us what to do next.
				if( onePrompt.cacheMode.toLowerCase() === "prefer-cache" ) {

					// Load the value from the cache
					me._overridePrompt( onePrompt, cachedValue );

					this.log(
						"Using " + chalk.magenta("~/.yo-rc.overrides.json") + " value for " + chalk.cyan( onePrompt.name ) + ": " + chalk.gray( cachedValue )
					);

					// .. and do not prompt the user ..
					return null;

				}

				onePrompt.default = cachedValue;

			}

			//global.$userPromptOverrides

			// Now we need to check to see if this generator is being used
			// as a partial and if the question has already been answered
			// in another partial.  First, though, if `askAgain` is TRUE,
			// we can skip these checks.
			if( onePrompt.askAgain === true ) {
				return onePrompt;
			}

			// Check for existing value ..
			memoryValue = me._getPreviousPromptAnswer( onePrompt.name );
			if( memoryValue === null ) {

				// The question has not already been answered..
				return onePrompt;

			} else {

				// The question has already been answered and `askAgain` is FALSE,
				// so, we can use the previous answer.
				me._overridePrompt( onePrompt, memoryValue );

				this.log(
					"Reusing " + chalk.yellow("memory") + " value for " + chalk.cyan( onePrompt.name ) + ": " + chalk.gray( memoryValue )
				);

				// .. and do not prompt the user ..
				return null;

			}

		},

		/**
		 * Stores an override value for a particular prompt.  This is usually
		 * called whenever the value for a prompt is found in either the `.yo-rc`
		 * configuration cache or in memory (because it has already been answered
		 * in this session).
		 *
		 * @access private
		 * @param {object} promptData The prompt being overridden
		 * @param {*} overrideValue The override value to use
		 * @returns {void}
		 */
		_overridePrompt: function( promptData, overrideValue ) {

			var me = this;
			var promptName = promptData.name;

			me._initPromptOverrideStore();

			me.$promptOverrides[ promptName ] = {
				data: promptData,
				value: overrideValue
			};

		},

		/**
		 * Ensures that the cache for storing overrides exists.
		 *
		 * @access private
		 * @returns {void}
		 */
		_initPromptOverrideStore: function() {

			var me = this;
			if( me.$promptOverrides === undefined ) {
				me.$promptOverrides = {};
			}

		},

		/**
		 * Checks to see if an answer has already been provided during this session
		 * for a particular prompt.  If so, the provided value is returned. If not,
		 * NULL is returned.
		 *
		 * @access private
		 * @param {string} promptName
		 * @returns {*|null}
		 */
		_getPreviousPromptAnswer: function( promptName ) {

			// Locals
			var me = this;

			// Ensure the global answer cache exists ..
			me._initPromptAnswerCache();

			// Check to see if the question has already been answered
			// in another partial sub-generator
			if( global.$promptAnswers[ promptName ] === undefined ) {
				return null;
			} else {
				return global.$promptAnswers[ promptName ];
			}

		},

		/**
		 * Initializes a GLOBAL store for prompt answers.  The is used to
		 * store a global state of question answers so that "composed" sub-generators
		 * do not ask the same questions over and over.  Global state is bad, yes,
		 * but this is the only way to do it because of Yeoman's composition
		 * behavior.
		 *
		 * @access private
		 * @returns {void}
		 */
		_initPromptAnswerCache: function() {

			let me = this;

			if( global.$promptAnswers === undefined ) {

				// Initialize the object
				global.$promptAnswers = {};

			}

		},

		/**
		 * Checks for and reads user prompt answer defaults from
		 * `~/.yo-rc.overrides.json`.
		 *
		 * @private
		 */
		_readUserPromptOverrides: function() {

			var me = this;
			var userOverridesPath = process.env.HOME + "/.yo-rc.overrides.json";
			var overridesJson, overridesObj;

			// We only need to do this once
			if( global.$userPromptOverrides !== undefined ) {
				return;
			}
			global.$userPromptOverrides = {};

			// Check to see if the file exists and is readable
			try {
				fs.accessSync( userOverridesPath, fs.constants.R_OK | fs.constants.W_OK );
				me.log(
					"Found " + chalk.magenta("user overrides") + " at " + chalk.cyan( userOverridesPath )
				);
			} catch (err) {
				me.log(
					"Missing " + chalk.magenta("user overrides") + " at " + chalk.cyan( userOverridesPath ) + " (skipping)"
				);

				// Skip
				return;
			}

			// Read the user overrides file
			try {
				overridesJson = fs.readFileSync( userOverridesPath, {
					encoding: "utf-8"
				});
			} catch (err) {
				me.log(
					chalk.red( "An error occured while attempting to read the user overrides file!" )
				);
				console.log("\n\n");
				console.log( err );
				console.log("\n\n");
				process.exit(1);
			}

			// Parse the JSON
			try {
				overridesObj = JSON.parse( overridesJson );
			} catch (err) {
				me.log(
					chalk.red( "An error occured while attempting to parse the user overrides file's JSON!" )
				);
				console.log("\n\n");
				console.log( err );
				console.log("\n\n");
				process.exit(1);
			}

			// Extract the configuration for this generator
			if( overridesObj[ me.config.name ] === undefined ) {
				me.log(
					chalk.magenta("User overrides") + " file does not have a " + chalk.cyan( me.config.name ) + " property; skipping."
				);

				// Skip
				return;
			} else {
				overridesObj = overridesObj[ me.config.name ];
			}

			// Load values
			global.$userPromptOverrides = overridesObj;

		},

		/**
		 * Shows the initial user prompts.  A number of base
		 * prompts will be shown automatically along with any,
		 * optional, prompts passed as `childPrompts`.
		 *
		 * @access private
		 * @param {string[]} basePromptRefs A list of prompts to use from the
		 *     base prompt list
		 * @param {object[]} childPrompts Optional child prompts
		 * @param {function} cb The callback to call after the user has
		 *     answered
		 * all of the questions/prompts.
		 * @returns {void}
		 */
		_showPrompts: function( basePromptRefs, childPrompts, cb ) {

			var me = this;
			var allPrompts = me._getSpecificBasePrompts( basePromptRefs );

			// Append Child Prompts
			allPrompts = me._mergePromptData( allPrompts, childPrompts );

			// Do final parsing on the prompt data
			allPrompts = me._getFinalPromptData( allPrompts );

			// Set Defaults
			me._setConfigDefaults( allPrompts );


			// Show the prompts
			if( allPrompts.length > 0 ) {

				me.prompt( allPrompts ).then(

					function( props ) {

						// Handle the input
						me._handlePromptInput( props, allPrompts );

						// Exec Callback
						cb();

					}.bind( me )

				);


			} else {

				// No prompts to show, we can skip straight
				// to property parsing ..
				me._handlePromptInput( {} );
				cb();

			}


		},

		/**
		 * Called after the user answers all of the prompts.
		 *
		 * @access private
		 * @param {object} allPropertyValues The user's answers
		 * @param {object} allPromptConfigs All prompt configurations, for all properties.
		 * @returns {void}
		 */
		_handlePromptInput: function( allPropertyValues, allPromptConfigs ) {

			var me = this;

			// Load values from the prompt override cache
			me._initPromptOverrideStore();
			_.each( me.$promptOverrides, function( val, promptName ) {
				allPropertyValues[ promptName ] = val.value;
			});

			// Apply advanced prompt processing (composition, validation, parsing)
			_.each( allPropertyValues, function( val, promptName ) {
				allPropertyValues[ promptName ] = me._finalizePropertyValue( promptName, val, allPromptConfigs, allPropertyValues );
			});

			// Update the config and store the answers in memory
			// in case they can be reused in another sub-generator...
			me._initPromptAnswerCache();
			_.each( allPropertyValues, function( val, key ) {
				me.config.set( key, val );
				global.$promptAnswers[ key ] = val;
			});

			// Store the properties
			me.props = allPropertyValues;

			// Parse base properties
			me._parseBaseProperties( allPropertyValues );

		},

		/**
		 * Parses the input data from a single prompt.
		 *
		 * @access private
		 * @param {string} promptName The name of the target prompt.
		 * @param {object} promptValue The user's answers for the target prompt.
		 * @param {object} allPrompts All prompt configurations, for all properties.
		 * @param {object} allValues All property values (though some may still
		 * require additional processing and the values within this object
		 * may not be final).
		 * @returns {*} The updated value for the target prompt, which may or
		 * may not be altered from the value passed as `promptValue`.
		 */
		_finalizePropertyValue: function( promptName, promptValue, allPrompts, allValues ) {

			// Locals
			var me = this;
			var promptConfig = null;
			var validationMsg;

			// Resolve the prompt configuration for THIS property.
			_.each( allPrompts, function( prompt ) {
				if( prompt.name === promptName ) {
					promptConfig = prompt;
					return false; // stop searching
				} else {
					return true;  // continue searching
				}
			});

			// If the prompt configuration could not be found, then the
			// value was provided from another source, such as a different
			// sub-generator, and processing it again would be redundant.
			if( promptConfig === null ) {
				return promptValue;
			}

			// If the prompt configuration specifies a 'compose'
			// function, then we'll execute it IF the promptValue
			// was left as its default value.
			if( promptConfig.compose !== undefined
				&& typeof promptConfig.compose === "function"
				&& promptConfig.default === promptValue ) {

				// Bind the compose function
				tmpFn = promptConfig.compose.bind( me );

				//compose: function( promptName, allValues, promptConfig, allPrompts )
				tmpValue = tmpFn( promptName, allValues, promptConfig, allPrompts );

				// If the compose function returns NULL or UNDEFINED,
				// then we will not alter the promptValue.
				if( tmpValue !== null && tmpValue !== undefined ) {
					promptValue = tmpValue;
				}

			}
			
			// Apply the parse function, if specified
			if( promptConfig.parse !== undefined
				&& typeof promptConfig.parse === "function" ) {

				// Bind the parse function
				tmpFn = promptConfig.parse.bind( me );

				//parse: function( promptName, promptValue, promptConfig, allValues, allPrompts )
				tmpValue = tmpFn( promptName, promptValue, promptConfig, allValues, allPrompts );

				// If the parse function returns NULL or UNDEFINED,
				// then we will not alter the promptValue.
				if( tmpValue !== null && tmpValue !== undefined ) {
					promptValue = tmpValue;
				}

			}

			// Apply validation..
			if( promptConfig.validationRegex !== undefined &&
				typeof promptConfig.validationRegex === "object" ) {

				if( !promptConfig.validationRegex.test( (promptValue + "") ) ) {

					if( promptConfig.validationFailureMessage !== undefined &&
						promptConfig.validationFailureMessage !== null ) {

						validationMsg = promptConfig.validationFailureMessage + "";

					} else {

						validationMsg = "The provided value does not appear to be valid!";

					}

					// Output and, optionally, exit..
					if( promptConfig.validateStrictly === true ) {

						me.log( "\n\n\n" );
						me.log( chalk.red("Error:") + " Prompt value validation failed!" );
						me.log( chalk.yellow( validationMsg ) );
						me.log( chalk.cyan( promptConfig.name + ": " ) + chalk.grey( promptValue ) );
						me.log( "\n\n\n" );
						process.exit(1);

					} else {

						me.log( chalk.yellow("Warning! ") + chalk.cyan( promptConfig.name + ": " ) + validationMsg );

					}

				}

			}

			// Return the final value
			return promptValue;

		},

		/**
		 * Parses the base prompt data (properties)
		 * todo: this should be replaced with 'parse' functions on the global prompts config.
		 *
		 * @access private
		 * @param {object[]} props
		 * @returns {void} All modifications are made by reference on
		 *     `this.props`
		 */
		_parseBaseProperties: function( props ) {

			// Parse the project name
			if( props.projectName !== undefined ) {
				props.parsedProject = props.projectName
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-");
			} else {
				props.parsedProject = "";
			}

			// Trim dashes from front and back of project
			if( props.parsedProject !== undefined ) {
				props.parsedProject = props.parsedProject.replace(/(^-|-$)/ig, '');
			} else {
				props.parsedProject = "";
			}

			// Parse the git repo name
			if( props.gitRepoName !== undefined ) {
				props.parsedRepoName = props.gitRepoName
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-");
			} else {
				props.parsedRepoName = "";
			}

			// Trim dashes from front and back of git repo
			if( props.parsedRepoName !== undefined ) {
				props.parsedRepoName = props.parsedRepoName.replace(/(^-|-$)/ig, '');
			} else {
				props.parsedRepoName = "";
			}
			
			// Parse the GitHub owner name
			if( props.githubOwner !== undefined ) {
				props.parsedGitHubOwner = props.githubOwner.toLowerCase();
			} else {
				props.parsedGitHubOwner = "";
			}

		},

		/**
		 * Creates a shared metadata object, which is useful for tying
		 * together two or more sub-generators.  For example, adding "mocha"
		 * will cause a meta object to be created for the "scripts/test.sh"
		 * script.
		 *
		 * @access private
		 * @param {string} objectType
		 * @param {string} name
		 * @param {object} config
		 * @returns {void}
		 */
		_createSharedObject: function( objectType, name, config ) {

			var me = this;
			var existing, id, obj;

			// Force lower-case type
			objectType = _.trim( objectType.toLowerCase() );

			// Get existing shared meta objects
			existing = me.config.get( "sharedMeta" );

			// Resolve a unique id for this object
			id = _.kebabCase( objectType + "_" + name ).toLowerCase();

			// Create the storage structure
			obj = {
				objectType: objectType,
				name: name,
				id: id,
				config: config
			};

			// Ensure we have a shared meta object store
			if( existing === undefined || existing === null ) {
				existing = {};
			}

			// Ensure we have a sub-store for this type
			if( existing[ objectType ] === undefined || existing[ objectType ] === null ) {
				existing[ objectType ] = {};
			}

			// Store the object
			existing[ objectType ][ id ] = obj;

			// Save the object store
			me.config.set( "sharedMeta", existing );

		},

		/**
		 * Gets all shared meta objects of a particular type.
		 *
		 * @access private
		 * @param {string} objectType
		 * @returns {object} A key/value object; if no shared objects of the
		 * provided type exist, an empty object will be returned.
		 */
		_getSharedObjects: function( objectType ) {

			var me = this;
			var existing;

			// Force lower-case type
			objectType = _.trim( objectType.toLowerCase() );

			// Get existing shared meta objects
			existing = me.config.get( "sharedMeta" );

			// Ensure we have a shared meta object store
			if( existing === undefined || existing === null ) {
				existing = {};
			}

			// If no objects of this type exist, we will return an empty object
			if( existing[ objectType ] === undefined || existing[ objectType ] === null ) {
				return {};
			} else {
				return existing[ objectType ];
			}

		},

		/**
		 * This helper method is specific to projects that include 'luke:vagrant',
		 * it allows a provisioning step using a slightly abbreviated syntax.
		 *
		 * @param scriptName The name of the script to add as a provisioning step.
		 * @private
		 */
		_addVagrantStep: function( scriptName ) {

			var me = this;
			me._createSharedObject(
				"vagrant-provision-step", scriptName, {
					script : scriptName
				}
			);

		},

		/**
		 * This helper method abbreviates the syntax for adding `npm run`
		 * scripts to the internal store that is used to generate the
		 * package.json file.
		 *
		 * @access protected
		 * @param {string} name The name of the script; this will be the
		 * property name that will be added to package.json's 'scripts' object.
		 * @param {string} templateFolder This is the source folder, which
		 * should be a folder within the root "/templates" directory of this
		 * repo/project.
		 * @param {string} dest Where the script should be placed within the
		 * project.
		 * @returns {void}
		 */
		_addNpmScript: function( name, templateFolder, dest ) {

			let me = this;

			// Resolve the source location
			// a. Add "_" to the filename..
			// b. Prepend template folder
			let src = templateFolder + "/" + me._addFilenamePrefix( dest, "_" );

			// Add the script to the shared object, which is
			// used, later, to build the package.json file.
			me._createSharedObject(
				"script", dest, {
					name : name,
					src  : src,
					dest : dest
				}
			);



			// IMPORTANT: The follow code has been disabled because it is
			// already being handled/implemented by the "scripts" sub-generator
			// via the `conflicts.writeNpmScripts` method.

			// Add an "implicit file" that will be
			// automatically copied later.
			//me._addImplicitStaticFile( src, dest );

		},

		/**
		 * This simple utility method will prepend a string to the
		 * filename within the provided path.
		 *
		 * @example
		 * let res = this._addFilenamePrefix( "some/path/file.txt", "_" );
		 * console.log( res ); // -> some/path/_file.txt
		 *
		 * @access protected
		 * @param {string} path An absolute or relative path to a file.
		 * @param {string} prefix The string to prepend to the filename.
		 * @returns {string} The final path, with the string prepended.
		 */
		_addFilenamePrefix: function( path, prefix ) {

			// Split/explode the path
			let tmpArr = path.split("/");

			// Find the last element of the path (filename)
			let fnIndex = tmpArr.length - 1;

			// Apply prefix to last element..
			tmpArr[ fnIndex ] = prefix + tmpArr[ fnIndex ];

			// Re-Combine
			return tmpArr.join("/");

		},

		/**
		 * Adds a static file to the implicit file store.
		 *
		 * @see _initImplicitFileStore
		 * @access protected
		 * @param {string} src The source path of the static file, relative
		 * to the "/templates" directory.
		 * @param {string} dest The destination path of the static file,
		 * relative the output project's root.
		 * @returns {void}
		 */
		_addImplicitStaticFile: function( src, dest ) {

			// Defer to _addImplicitFile with presets...
			this._addImplicitFile( "static", src, dest, {} );

		},

		/**
		 * Initializes the "implicit file store", which stores instructions
		 * for file creation/copy operations that were generated by other
		 * methods and operations within this class (such as `_addNpmScript`).
		 *
		 * Implicit files allow file copy/create operations to be defined
		 * by earlier processes and, then, copied during the normal file
		 * copy stages of the overall scaffolding operation.
		 *
		 * @access private
		 * @returns {void}
		 */
		_initImplicitFileStore: function() {

			// Locals
			let me = this;

			// Init the store if it does not exist
			if( me._implicitFiles === undefined ) {
				me._implicitFiles = [];
			}

		},

		/**
		 * Adds a file to the implicit file store.
		 *
		 * @see _initImplicitFileStore
		 * @access private
		 * @param {string} type The type of file being added; this value can
		 * only be "static" (other types may be added later)
		 * @param {string} src The source path of the file, relative to the
		 * "/templates" directory.
		 * @param {string} dest The destination path of the file, relative the
		 * output project's root.
		 * @param {object?} [opts=null] Additional options that will be passed to the
		 * creation method, if applicable.
		 * @returns {void}
		 */
		_addImplicitFile: function( type, src, dest, opts ) {

			// Locals
			let me = this;

			// Ensure the store exists ...
			me._initImplicitFileStore();

			// Add the file to the store
			me._implicitFiles.push({
				type: type,
				src: src,
				dest: dest,
				opts: opts
			});

		},

		/**
		 * Copies all "implicit files" from the "implicit file store".
		 *
		 * @see _initImplicitFileStore
		 * @access protected
		 * @returns {void}
		 */
		_copyImplicitFiles: function() {

			// Locals
			let me = this;

			// Ensure the store exists ...
			me._initImplicitFileStore();

			// Iterate over each implicit file definition
			_.each( me._implicitFiles, function( file ) {

				// Differentiate between the different types
				// of implicit files...
				switch( file.type ) {

					case "static":
						me.fs.copy(
							me.templatePath( file.src ), me.destinationPath( file.dest )
						);
						break;

				}

			});

		}

	}
);
