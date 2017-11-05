/**
 * This is a "project scaffold" sub-generator that generates a project scaffold
 * for a Grits.js website.
 *
 * @scaffold
 * @example
 * $ npm install -g yo generator-luke
 * $ mkdir my-project
 * $ cd my-project
 * $ yo luke:grits
 *
 * @uses package, mit-license, readme, js, editor, npm
 * @uses vagrant, mocha, scripts, bower, travis-grits
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-22
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.generators.Base.extend({

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		me.composeWith("luke:package");
		me.composeWith("luke:mit-license");
		me.composeWith("luke:readme");
		me.composeWith("luke:js");
		me.composeWith("luke:editor");
		me.composeWith("luke:npm");
		me.composeWith("luke:git");
		me.composeWith("luke:vagrant");
		me.composeWith("luke:mocha");
		me.composeWith("luke:scripts");
		me.composeWith("luke:bower");
		me.composeWith("luke:travis-grits");

	},

	configuring: function() {
		this.log(" ");
	}

});
