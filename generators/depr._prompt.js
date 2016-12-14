/**
 * This file is used by all sub-generators that need to ask questions.  All
 * (or most) of the questions that will be asked to a user should be stored
 * here, for consistency.
 *
 * @example
 * var q = require("../_questions");
 * var questions = q( this, ["projectName", "projectDesc"] );
 * this.prompt( questions, function() { .. } );
 *
 * @author Luke Chavers <luke@c2cschools.com>
 * @created 2016-04-29
 */

var _ = require("lodash");

var theAsker = module.exports = function promptWithQuestions( generator, questionKeys, additionalQuestions ) {

	var allQuestions = [];
	var coreQuestions = {

		projectName  : {
			type    : "input",
			name    : "projectName",
			message : "What is the name of this project?",
			default : generator.appname
		},
		projectDesc  : {
			type    : "input",
			name    : "projectDesc",
			message : "Please describe this project:",
			default : ""
		},
		fullName     : {
			type    : "input",
			name    : "fullName",
			message : "What is your full name?",
			default : ""
		},
		emailAddress : {
			type    : "input",
			name    : "emailAddress",
			message : "What is your email address?",
			default : ""
		},
		gitGroup     : {
			type    : "input",
			name    : "gitGroup",
			message : "Which GitLab group does this project belong to?",
			default : "NodeJS"
		}

	};

	_.each( questionKeys, function( key ) {

		if( coreQuestions[key] !== undefined ) {
			allQuestions.push( coreQuestions[key] );
		}

	});



	// ---




	// Append Child Prompts
	_.each( additionalQuestions, function(p) {
		allQuestions.push(p);
	});

	// Set Defaults
	var dvals = {};
	_.each( allQuestions, function(p) {
		dvals[p.name] = p.default;
	});
	generator.config.defaults(dvals);

	// Execute config reads
	_.each( allQuestions, function(p) {
		p["default"] = generator.config.get( p.name );
	});

	// Show the prompts
	generator.prompt(
		allQuestions, function( props ) {

			// Update the config
			_.each( props, function( val, key ) {
				generator.config.set( key, val );
			});

			// Store the properties
			generator.props = props;

			// Parse base properties
			//me._parseBaseProperties( props );

			// Exec Callback
			//cb();
			generator.async();

		}.bind( generator )
	);

	//console.log( allQuestions );
	//return allQuestions;

};






