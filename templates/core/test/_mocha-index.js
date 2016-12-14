// Dependencies
var util = require("./lib/util");
var expect  = util.expect;

// Settings
var fixtureName = "a-fixture-subdir";

// Tests
describe("Some Component:", function() {

	var rndr;

	before( function( cb ) {
		cb();
	});

	describe("Some Sub-Part:", function() {

		it("should do something", function() {

			// expect( something ).to.be.a( "something" );

		});

	});

});
