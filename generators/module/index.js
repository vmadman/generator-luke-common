/**
 * This is a "project scaffold" sub-generator that generates a project scaffold
 * for a basic Node.js module project.
 *
 * @example
 * shell> yo luke:module
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
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

	},

	configuring: function() {
		this.log(" ");
	}

});
