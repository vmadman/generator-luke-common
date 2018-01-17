/**
 * This is a "partial" sub-generator that generates a simple scaffold for
 * authoring Docker containers using the "Base/Deploy" pattern.
 *
 * @partial
 * @example
 * $ yo luke:docker-bd
 *
 * @promptsFor dockerImageName, awsCustomerId, ecrNamespace
 * @promptsFor containershipOrgId, containershipClusterId, containershipApiKey
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2018-01-15
 */

var yeoman        = require( "yeoman-generator" );
var baseGenerator = require( "../_BaseGenerator" );
var _             = require( "lodash" );

module.exports = baseGenerator.extend(
	{

		initializing : function () {

			// Locals
			var me = this;

		},

		prompting : function () {

			// Locals
			var me = this;

			// Initialize the base generator
			me._initBase();

			// Define custom prompts
			let customPrompts = [];

			// Docker
			customPrompts.push( {
				type      : "input",
				name      : "dockerImageName",
				message   : "What is the name of your Docker image?",
				default   : "my-image",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );

			// AWS
			customPrompts.push( {
				type      : "input",
				name      : "awsCustomerId",
				message   : "What is your AWS customer id?",
				default   : "0123456789",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );
			customPrompts.push( {
				type      : "input",
				name      : "ecrNamespace",
				message   : "What ECR namespace would you like to deploy to?",
				default   : "my-namespace",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );

			// ContainerShip
			customPrompts.push( {
				type      : "input",
				name      : "containershipOrgId",
				message   : "What is your ContainerShip Organization ID?",
				default   : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );
			customPrompts.push( {
				type      : "input",
				name      : "containershipClusterId",
				message   : "What is your ContainerShip Cluster ID?",
				default   : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );
			customPrompts.push( {
				type      : "input",
				name      : "containershipApiKey",
				message   : "What is your ContainerShip API Key?",
				default   : "<cs-api-key-goes-here>",
				cacheMode : "prefer-cache",
				askAgain  : false
			} );


			// Show user prompts
			me._showPrompts(
				// Prompts from the base generator
				[ "projectName", "projectDesc", "emailAddress", "githubOwner", "gitRepoName" ],

				// Additional, custom, prompts
				customPrompts,

				// Callback function
				me.async()
			);

		},

		default : {

			createSharedMetaObjects : function () {

				var me = this;

				// -- Basic Docker Scripts -------------------------------------

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/base-image/_build-base-image.sh->scripts/base-image/build-base-image.sh
				 * @operation Adds a NPM run script named `base:build`
				 */
				me._addNpmScript(
					"base:build",
					"docker-bd-ecr-cship",
					"scripts/base-image/build-base-image.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/base-image/_run-shell.sh->scripts/base-image/run-shell.sh
				 * @operation Adds a NPM run script named `base:shell`
				 */
				me._addNpmScript(
					"base:shell",
					"docker-bd-ecr-cship",
					"scripts/base-image/run-shell.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/deploy-image/_build-deploy-image.sh->scripts/deploy-image/build-deploy-image.sh
				 * @operation Adds a NPM run script named `deploy:build`
				 */
				me._addNpmScript(
					"deploy:build",
					"docker-bd-ecr-cship",
					"scripts/deploy-image/build-deploy-image.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/deploy-image/_run-shell.sh->scripts/deploy-image/run-shell.sh
				 * @operation Adds a NPM run script named `deploy:shell`
				 */
				me._addNpmScript(
					"deploy:shell",
					"docker-bd-ecr-cship",
					"scripts/deploy-image/run-shell.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/deploy-image/_run-in-foreground.sh->scripts/deploy-image/run-in-foreground.sh
				 * @operation Adds a NPM run script named `deploy:fg`
				 */
				me._addNpmScript(
					"deploy:fg",
					"docker-bd-ecr-cship",
					"scripts/deploy-image/run-in-foreground.sh"
				);

				// -- ECR Scripts ----------------------------------------------

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/ci/push-base-image-to-ecr.sh->scripts/ci/push-base-image-to-ecr.sh
				 * @operation Adds a NPM run script named `ci:base:push`
				 */
				me._addNpmScript(
					"ci:base:push",
					"docker-bd-ecr-cship",
					"scripts/ci/push-base-image-to-ecr.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/ci/push-deploy-image-to-ecr.sh->scripts/ci/push-deploy-image-to-ecr.sh
				 * @operation Adds a NPM run script named `ci:deploy:push`
				 */
				me._addNpmScript(
					"ci:deploy:push",
					"docker-bd-ecr-cship",
					"scripts/ci/push-deploy-image-to-ecr.sh"
				);

				// -- ContainerShip Scripts ------------------------------------

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/ci/update-cs-application.sh->scripts/ci/update-cs-application.sh
				 * @operation Adds a NPM run script named `ci:deploy:cs`
				 */
				me._addNpmScript(
					"ci:deploy:cs",
					"docker-bd-ecr-cship",
					"scripts/ci/update-cs-application.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/containership/force-production-relaunch.sh->scripts/containership/force-production-relaunch.sh
				 * @operation Adds a NPM run script named `cship:relaunch`
				 */
				me._addNpmScript(
					"cship:relaunch",
					"docker-bd-ecr-cship",
					"scripts/containership/force-production-relaunch.sh"
				);

				/**
				 * @creates static:docker-bd-ecr-cship/scripts/containership/show-production-status.sh->scripts/containership/show-production-status.sh
				 * @operation Adds a NPM run script named `cship:status`
				 */
				me._addNpmScript(
					"cship:status",
					"docker-bd-ecr-cship",
					"scripts/containership/show-production-status.sh"
				);

			}

		},

		writing : {

			createPartialFiles : function () {

				// Locals
				let me = this;

				// Copies any files that have been implied by other
				// mechanisms, such as `#_addNpmScript` (above).
				me._copyImplicitFiles();

				/** @creates template:docker-bd-ecr-cship/scripts/_vars.sh->scripts/_vars.sh **/
				// todo: implement a 'vars.d' pattern for more universality
				me.fs.copyTpl(
					me.templatePath( "docker-bd-ecr-cship/scripts/_vars.sh" ),
					me.destinationPath( "scripts/_vars.sh" ),
					me.props
				);


				// -- Docker Config --------------------------------------------

				// a. Base Image
				/** @creates static:docker-bd-ecr-cship/docker/base-image/config/_README.md->docker/base-image/config/README.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docker/base-image/config/_README.md" ), me.destinationPath( "docker/base-image/config/README.md" )
				);

				/** @creates template:docker-bd-ecr-cship/docker/base-image/_Dockerfile->docker/base-image/Dockerfile **/
				me.fs.copyTpl(
					me.templatePath( "docker-bd-ecr-cship/docker/base-image/_Dockerfile" ),
					me.destinationPath( "docker/base-image/Dockerfile" ),
					me.props
				);

				// b. Deploy Image
				/** @creates static:docker-bd-ecr-cship/docker/deploy-image/config/_README.md->docker/deploy-image/config/README.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docker/deploy-image/config/_README.md" ), me.destinationPath( "docker/deploy-image/config/README.md" )
				);

				/** @creates template:docker-bd-ecr-cship/docker/deploy-image/_Dockerfile->docker/deploy-image/Dockerfile **/
				me.fs.copyTpl(
					me.templatePath( "docker-bd-ecr-cship/docker/deploy-image/_Dockerfile" ),
					me.destinationPath( "docker/deploy-image/Dockerfile" ),
					me.props
				);
				
				// -- Documentation --------------------------------------------


				/** @creates static:docker-bd-ecr-cship/docs/_deploy-config.md->docs/deploy-config.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_deploy-config.md" ), me.destinationPath( "docs/deploy-config.md" )
				);

				/** @creates static:docker-bd-ecr-cship/docs/_dev-base-image.md->docs/dev-base-image.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_dev-base-image.md" ), me.destinationPath( "docs/dev-base-image.md" )
				);

				/** @creates static:docker-bd-ecr-cship/docs/_dev-deploy-image.md->docs/dev-deploy-image.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_dev-deploy-image.md" ), me.destinationPath( "docs/dev-deploy-image.md" )
				);

				/** @creates static:docker-bd-ecr-cship/docs/_image-hierarchy.md->docs/image-hierarchy.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_image-hierarchy.md" ), me.destinationPath( "docs/image-hierarchy.md" )
				);

				/** @creates static:docker-bd-ecr-cship/docs/_installation.md->docs/installation.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_installation.md" ), me.destinationPath( "docs/installation.md" )
				);

				/** @creates static:docker-bd-ecr-cship/docs/_project-scripts.md->docs/project-scripts.md **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/docs/_project-scripts.md" ), me.destinationPath( "docs/project-scripts.md" )
				);


				// -- Travis ---------------------------------------------------

				/** @creates static:docker-bd-ecr-cship/_travis.yml->.travis.yml **/
				me.fs.copy(
					me.templatePath( "docker-bd-ecr-cship/_travis.yml" ), me.destinationPath( ".travis.yml" )
				);

				// -- Readme ---------------------------------------------------

				/** @creates template:docker-bd-ecr-cship/_README.md->README.md **/
				me.fs.copyTpl(
					me.templatePath( "docker-bd-ecr-cship/_README.md" ),
					me.destinationPath( "README.md" ),
					me.props
				);



			}

		}

	}
);
