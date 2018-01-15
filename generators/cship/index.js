/**
 * This is a "project scaffold" sub-generator that generates a project scaffold
 * for Docker image production.  The initally generated project will, also, be
 * biased towards deployment to AWS ECR + Containership.io and development on an
 * AWS Cloud9 Development Environment.
 *
 * @scaffold
 * @example
 * $ npm install -g yo generator-luke
 * $ mkdir my-project
 * $ cd my-project
 * $ yo luke:cship
 *
 * @uses package, mit-license, editor, git, scripts, cship-files
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2018-01-15
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.generators.Base.extend({

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		// a. The basics
		me.composeWith("luke:package");
		me.composeWith("luke:mit-license");
		me.composeWith("luke:editor");
		me.composeWith("luke:git");
		me.composeWith("luke:scripts");

		// b. Docker / ECR / ContainerShip
		me.composeWith("luke:cship-files");

	},

	configuring: function() {
		this.log(" ");
	}

});
