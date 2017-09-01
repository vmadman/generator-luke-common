/**
 * Helper functions/etc for unit tests.
 *
 * @author Luke Chavers <luke@c2cschools.com>
 * @created 2017-07-14
 */
"use strict";


// Dependencies
let path 	= require( "path" );
let Promise = require( "bluebird" );
let chai 	= require( "chai" );
let expect 	= chai.expect;
let _		= require( "lodash" );

// Initialize static utils class
let u = module.exports = {
	lodash : _,
	chai   : chai,
	expect : expect,
	path   : path,
	Promise: Promise
};


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

u.isISO8601 = function( str ) {

	let regx = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	return !!str.match( regx );

};
