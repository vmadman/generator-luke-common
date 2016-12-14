/**
 * Unit Testing Utilities and Libraries
 */

//<editor-fold desc="++++++++ Dependencies and Initialization ++++++++">

// Load project files, if needed, here:
// require( "../../index" );

// Dependencies
var path 	= require( "path" );
var chai 	= require( "chai" );
var expect 	= chai.expect;
var _		= require( "lodash" );

// Common libs that may not be needed for every project:
// var tipe	= require( "tipe" );
// var fs		= require( "fs-extra" );
// var Promise = require( "bluebird" );
// Promise.promisifyAll( fs );

// Initialize static utils class
var u = module.exports = {
	lodash  : _,
	chai    : chai,
	expect  : expect,
	// tipe    : tipe,
	// fs      : fs,
	// Promise : Promise,
	path    : path
};

//</editor-fold>

//<editor-fold desc="++++++++ Fixtures and Paths ++++++++">

/**
 * Resolves various directories for a fixture.
 *
 * @param {string} fixtureName
 * @returns {object}
 */
u.getPaths = function( fixtureName ) {

	var ret = {};

	// Find the fixture root directory
	ret.fixtureRoot = path.join( __dirname, "..", "fixtures", fixtureName );

	// All done
	return ret;

};

//</editor-fold>

//<editor-fold desc="++++++++ Methods for STDOUT/Console.log ++++++++">

/**
 * A debugging function for outputting a string (usually a multi-line string)
 * to STDOUT with line numbers.
 *
 * @param {string} name A name for the content, for reference..
 * @param {string} content The content to dump
 * @returns {void}
 */
u.dbg = function( name, content ) {

	var me = this;
	var title = _.padEnd( "---- " + name + " ", 80, "-" );

	me.bl(2);
	me.lg( title );
	me.bl(2);

	var spl = content.split("\n");
	_.each( spl, function( line, index ) {

		var lineNo = (index+1);
		var strLineNo = _.padStart( lineNo + "", 5, "0" );
		me.lg("    " + strLineNo + ": " + line);

	});

	me.bl(2);

};

/**
 * A utility function that outputs one or more blank lines to STDOUT.
 *
 * @param {number} [count=1] The number of blank lines to output
 * @returns {void}
 */
u.bl = function( count ) {

	var me = this;

	if( count === undefined || count === null ) {
		count = 1;
	} else {
		count = parseInt( count, 10 );
	}

	if( count < 1 ) {
		return;
	}
	if( count > 100 ) {
		count = 100;
	}

	_.times( count, function() {
		me.lg(" ");
	});

};

/**
 * An alias for console.log; this exists in case we wanted
 * to insert something special at the lowest possible level.
 *
 * @param {string} str The string to output to STDOUT
 * @returns {void}
 */
u.lg = function( str ) {
	console.log(str);
};

/**
 * Outputs a dividing line to STDOUT.
 *
 * @returns {void}
 */
u.div = function() {

	var me = this;
	me.bl(2);
	me.lg("-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~");
	me.bl(2);

};


//</editor-fold>
