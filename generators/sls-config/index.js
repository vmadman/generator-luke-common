/**
 * This is a "partial" sub-generator that generates the basic Serverless
 * Framework configuration files.
 *
 * @example
 * shell> yo luke:sls-config
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

			// Show user prompts
			me._showPrompts(

				// Prompts from the base generator
				["copyrightHolder", "projectDesc", "fullName", "emailAddress", "gitRepoName", "projectVersion"],

				// Additional, custom, prompts
				[{
					type        : "input",
					name        : "awsCustomerId",
					message     : "What is your AWS customer id?",
					default     : "0123456789",
					cacheMode	: "prefer-cache",
					askAgain	: false
				},{
					type        : "input",
					name        : "awsSecurityGroupId",
					message     : "What AWS security group should this service use?",
					default     : "sg-0123456",
					cacheMode	: "prefer-cache",
					askAgain	: false
				},{
					type        : "input",
					name        : "awsSubnetId",
					message     : "What AWS subnet should this service run on?",
					default     : "subnet-0123456",
					cacheMode	: "prefer-cache",
					askAgain	: false
				},{
					type        : "input",
					name        : "awsRegion",
					message     : "What AWS region should this service run in?",
					default     : "us-east-1",
					cacheMode	: "prefer-cache",
					askAgain	: false
				},{
					type        : "input",
					name        : "lambdaRuntime",
					message     : "Which AWS Lambda run-time should be used?",
					default     : "nodejs4.3",
					cacheMode	: "prefer-cache",
					askAgain	: false
				}],

				// Callback function
				me.async()

			);

			/*
			"projectName": "sls-service-awards",
				"vagrantPortStart": "3090",
				"vagrantPortCount": "6",
				"projectDesc": "Part of the C2C Microservice Architecture; this services specializes in Models, Resources, and Logic related to awards.",
				"fullName": "Luke Chavers",
				"emailAddress": "luke@c2cschools.com",
				"githubOwner": "c2cs",
				"gitRepoName": "sls-service-awards",
				"copyrightHolder": "C2C Schools, LLC"
			*/

		},

		writing : {
			
			createPartialFiles : function() {

				var me = this;

				// serverless.env.yml
				me.fs.copyTpl(
					me.templatePath( "serverless/_serverless.env.yml" ), me.destinationPath( "serverless.env.yml" ), {
						"gitRepoName": me.props.gitRepoName
					}
				);

				// serverless.yml
				me.fs.copyTpl(
					me.templatePath( "serverless/_serverless.yml" ), me.destinationPath( "serverless.yml" ), {
						"gitRepoName": me.props.gitRepoName,
						"awsCustomerId": me.props.awsCustomerId,
						"awsRegion": me.props.awsRegion,
						"lambdaRuntime": me.props.lambdaRuntime
					}
				);

				// .sls/README.md
				me.fs.copy(
					me.templatePath( "serverless/_sls/_README.md" ), me.destinationPath( ".sls/README.md" )
				);

				// .sls/projectConfig.json
				me.fs.copyTpl(
					me.templatePath( "serverless/_sls/_projectConfig.json" ), me.destinationPath( ".sls/projectConfig.json" ), {
						"projectVersion": me.props.projectVersion,
						"projectDesc": me.props.projectDesc,
						"fullName": me.props.fullName,
						"emailAddress": me.props.emailAddress,
						"gitRepoName": me.props.gitRepoName
					}
				);

				// .sls/projectConfig.yml
				me.fs.copyTpl(
					me.templatePath( "serverless/_sls/_projectConfig.yml" ), me.destinationPath( ".sls/projectConfig.yml" ), {
						"projectVersion": me.props.projectVersion,
						"projectDesc": me.props.projectDesc,
						"fullName": me.props.fullName,
						"emailAddress": me.props.emailAddress,
						"gitRepoName": me.props.gitRepoName
					}
				);

				// .sls/projectConfig.yml
				me.fs.copyTpl(
					me.templatePath( "serverless/_sls/_serverless.common.yml" ), me.destinationPath( ".sls/serverless.common.yml" ), {
						"awsCustomerId": me.props.awsCustomerId,
						"awsSecurityGroupId": me.props.awsSecurityGroupId,
						"awsSubnetId": me.props.awsSubnetId
					}
				);

				/*
				// .gitignore
				me.fs.copy(
					me.templatePath( "core/_gitignore" ), me.destinationPath( ".gitignore" )
				);

				// .gitattributes
				me.fs.copy(
					me.templatePath( "core/_gitattributes" ), me.destinationPath( ".gitattributes" )
				);
				*/


			}

		}

	}
);
