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
		 * Returns the [static] "base" prompt data.  These are prompts that are common
		 * and used by many different sub-generators.
		 *
		 * @access private
		 * @returns {object[]} An array of prompt items
		 */
		_getBasePrompts: function() {

			var me = this;

			return [
				{
					type        : "input",
					name        : "projectName",
					message     : "What is the name of this project?",
					default     : me.appname,
					cacheMode	: "prefer-cache",
					askAgain	: false
				}, {
					type        : "input",
					name        : "projectDesc",
					message     : "Please describe this project:",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}, {
					type        : "input",
					name        : "fullName",
					message     : "What is your full name?",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}, {
					type        : "input",
					name        : "emailAddress",
					message     : "What is your email address?",
					default     : "",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}, {
					type        : "input",
					name        : "gitGroup",
					message     : "Which GitLab group does this project belong to?",
					default     : "NodeJS",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}
			];

			// todo: remove or replace gitGroup above

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

			// Apply default for 'cacheMode'
			if( onePrompt.cacheMode === undefined || onePrompt.cacheMode === undefined ) {
				onePrompt.cacheMode = "default-only";
			}

			// Apply default for 'cacheMode'
			if( onePrompt.askAgain === undefined || onePrompt.askAgain !== true ) {
				onePrompt.askAgain = false;
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

			if( global.$promptAnswers === undefined ) {
				global.$promptAnswers = {};
			}

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
						me._handlePromptInput( props );

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
		 * @param {object} props The user's answers
		 * @returns {void}
		 */
		_handlePromptInput: function( props ) {

			var me = this;

			// Load values from the prompt override cache
			me._initPromptOverrideStore();
			_.each( me.$promptOverrides, function( val, promptName ) {
				props[ promptName ] = val.value;
			});

			// Update the config and store the answers in memory
			// in case they can be reused in another sub-generator...
			me._initPromptAnswerCache();
			_.each( props, function( val, key ) {
				me.config.set( key, val );
				global.$promptAnswers[ key ] = val;
			});

			// Store the properties
			me.props = props;

			// Parse base properties
			me._parseBaseProperties( props );

		},

		/**
		 * Parses the base prompt data (properties)
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

			// Parse the GitLab group name
			if( props.gitGroup !== undefined ) {
				props.parsedGroup = props.gitGroup
					.toLowerCase();
			} else {
				props.parsedGroup = "";
			}

			// Trim dashes from front and back of project
			if( props.parsedProject !== undefined ) {
				props.parsedProject = props.parsedProject.replace(/(^-|-$)/ig, '');
			} else {
				props.parsedProject = "";
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

		}

	}
);
