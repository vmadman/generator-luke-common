/**
 * This is a "project scaffold" sub-generator that generates a minimal project
 * scaffold that should be useful as a starting point for most of my projects.
 * This scaffold/generator is also the default generator and will execute if
 * no sub-generator is specified.
 *
 * @scaffold
 * @example
 * $ npm install -g yo generator-luke
 * $ mkdir my-project
 * $ cd my-project
 * $ yo luke
 *
 * @uses package, mit-license, readme, git
 * @author Luke Chavers <me@lukechavers.com>
 * @created 2016-12-14
 */

var yeoman = require( "yeoman-generator" );

module.exports = yeoman.Base.extend({

	initializing : function() {

		// Locals
		var me = this;

		// Compose
		me.composeWith("luke:package");
		me.composeWith("luke:mit-license");
		me.composeWith("luke:readme");
		me.composeWith("luke:git");

		/** @uses editor,scripts **/
		me.composeWith("luke:editor");
		me.composeWith("luke:scripts");

		/** @uses vagrant **/
		me.composeWith("luke:vagrant");

	},

	configuring: function() {
		this.log(" ");
	}

});
