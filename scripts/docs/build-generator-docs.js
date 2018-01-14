#!/usr/bin/env node

/**
 *
 **/
'use strict';

// load Deps
const dox  = require( "dox" );
const klaw = require( "klaw" );
const fs   = require( "fs-extra-promise" );
const _    = require( "lodash" );
const PATH = require( "path" );

// Basic Settings
const GENERATOR_NAME = "luke";
const REL_DOC_ROOT_PATH = "docs/";

// Absolute Output Paths
const ABS_DOC_ROOT_PATH = PATH.join( __dirname, "../..", REL_DOC_ROOT_PATH );
const ABS_PARTIAL_DOC_PATH = PATH.join( ABS_DOC_ROOT_PATH, "partials" );
const ABS_SCAFFOLD_DOC_PATH = PATH.join( ABS_DOC_ROOT_PATH, "project-scaffolds" );

// Tracks the status of the read operation
let readOp = {
	totalFiles: 0,
	filesParsed: 0
};

// Configuration for `klaw`
let klawOptions = {};

// Configuration for `dox`
let doxOptions = {
	raw: true
};

// A store for the raw tag
// data collected by Dox.
let rawTagData 	= {};

// A store for the parsed
// generator data.
let generators = {
	all: {},
	partial: {},
	scaffold: {}
};

// Say hello!
console.log("");
console.log("");
console.log("");
lg("Building generator docs ...");

// Remove existing output...
lg("Cleaning up existing documentation at: " + ABS_PARTIAL_DOC_PATH );
fs.emptyDirSync( ABS_PARTIAL_DOC_PATH );
lg("Cleaning up existing documentation at: " + ABS_SCAFFOLD_DOC_PATH );
fs.emptyDirSync( ABS_SCAFFOLD_DOC_PATH );

// Initialize `klaw` and start a scan..
klaw( "./generators", klawOptions )
	.on( "data", onItemFound )
	.on( "end", onScanEnd );


/**
 * This function is called for every item that `klaw`
 * finds in its scan, which won't necessarily be a
 * generator file or even a JavaScript file.
 *
 * So, this method will filter the raw `klaw` results
 * and pass all JavaScript files, that are not prefixed
 * with `depr.` or `_`, to the `parseGeneratorFile`
 * method for further processing.
 *
 * @access public
 * @param {object} item One result from a `klaw` scan.
 * @param {string} item.path The full, absolute, path to the item (file)
 * @param {object} item.stats Additional meta info about the item.
 * @param {object} item.stats.Stats The `stat` information for the item.
 * @returns {void}
 */
function onItemFound( item ) {

	if ( _.endsWith( item.path, ".js" )
		&& item.path.indexOf( "depr." ) === -1
		&& item.path.indexOf( "/_" ) === -1 ) {

		parseGeneratorFile( item );

	}

}

/**
 * This function is called for every generator file that
 * `klaw` finds; it is called, exclusively, by the `onItemFound`
 * function, which ensures that the item (file) is a generator.
 *
 * @access public
 * @param {object} file One result from a `klaw` scan.
 * @param {string} file.path The full, absolute, path to the item (file)
 * @param {object} file.stats Additional meta info about the item.
 * @param {object} file.stats.Stats The `stat` information for the item.
 * @returns {void}
 */
function parseGeneratorFile( file ) {

	// Increment the operation tracker (found)
	readOp.totalFiles++;

	// Locals
	let p = file.path;

	// Append the global tag data store.
	let store = rawTagData[ p ] = {
		file: file,
		description: null,
		doxData: null
	};

	// Read the file ...
	fs.readFileAsync( file.path ).then(

		function onFileRead( bContents ) {

			// Log
			lg("Parsing file: " + p);

			// Locals
			let combined 	= [];

			// Parse the raw file contents using Dox
			let data 		= dox.parseComments( bContents.toString(), doxOptions );

			// Iterate over each item that Dox found
			_.each( data, function( d ) {

				// We'll use the first "summary" that we
				// find as the generator's description.
				if( store.description === null && d.description.summary !== "" ) {
					store.description = d.description.summary;
				}

				// We'll combine ALL tags found in the file
				// into a single array and will process them
				// all together later on.
				_.each( d.tags, function( tag ) {
					combined.push( tag );
				});

			});

			// Persist the tag data.
			store.doxData = combined;

			// Increment the operation tracker (parsing)
			readOp.filesParsed++;
			waitForAllParsing();

		}

	);

}

/**
 * This intermediate method simply ensures that all
 * sub-generator source files have been parsed before
 * processing continues.
 *
 * @access public
 * @returns {void}
 */
function waitForAllParsing() {

	if( readOp.filesParsed === readOp.totalFiles ) {
		parseRawTagData();
		writeDocs();
	}

}

function onScanEnd() {
}

/**
 * Parses the raw tag data to extrapolate an information
 * object for each generator.
 */
function parseRawTagData() {

	// Pre-populate the `generators.all` store with
	// all of the generator names, so that they can
	// be referenced.
	_.each( rawTagData, function( gen, path ) {
		let name = getGeneratorNameFromPath( path );
		generators.all[ name ] = null;
	});

	// Iterate over each file and its Dox data
	_.each( rawTagData, function( gen, path ) {

		// Resolve a name for the generator
		let name = getGeneratorNameFromPath( path );

		// Initialize a generator info object
		let item = {
			name: name,
			type: "partial",
			isDefault: false,
			description: gen.description,
			author: null,
			created: null,
			paths: {
				abs: path,
				rel: getRelativeGeneratorPath( path )
			},
			uses: {},
			creates: {},
			operations: [],
			promptsFor: {},
			example: null
		};

		// Parse each tag object generated by Dox
		_.each( gen.doxData, function( tag ) {
			parseOneTag( item, tag );
		});

		// Persist the generator info object
		generators.all[ name ] = item;
		generators[ item.type ][ name ] = item;

	});

}

/**
 * Resolve the name of a generator by its file system path.
 *
 * @access public
 * @param {string} path The absolute path to the generator file.
 * @returns {string} The name of the generator.
 */
function getGeneratorNameFromPath( path ) {

	// Split the path
	let spl = path.split("/");

	// Return the last directory in the path
	// path  : /generator-luke-common/generators/test-dir/index.js
	// result: test-dir
	return spl[ ( spl.length -2 ) ];

}

/**
 * Resolves the path of a generator, relative to the project
 * root, when provided an absolute path.
 *
 * @access public
 * @param {string} absPath An absolute path to a generator.
 * @returns {string} The relative path for the generator.
 */
function getRelativeGeneratorPath( absPath ) {

	let spl = absPath.split( "generators" );
	let rel = spl[ (spl.length - 1 ) ];
	return "generators" + rel;

}

function parseOneTag( item, tag ) {

	switch( tag.type.toLowerCase() ) {

		case "scaffold":
			item.type = "scaffold";
			break;

		case "partial":
			item.type = "partial";
			break;

		case "example":
			item.example = tag.string;
			break;

		case "author":
			item.author = tag.string;
			break;

		case "created":
			item.created = tag.string;
			break;

		case "default-generator":
			item.isDefault = true;
			break;

		case "uses":
			parseUsesTag( item, tag );
			break;

		case "creates":
			parseCreatesTag( item, tag );
			break;

		case "promptsfor":
			parsePromptsForTag( item, tag );
			break;

		case "operation":
			let op = tag.string.replace(/\s+\*+$/, '');
			item.operations.push( op );
			break;

		default:
			//console.log("--- unknown tag!! ---");
			//console.log( tag );

			// todo: we probs shouldn't throw errors because
			// it would disallow normal jsdoc markup in the file
			// but, for now, I want to be sure there aren't
			// any generator tags being skipped...
			throw new Error("Unknown/unrecognized tag (" + tag.type + ")!");

			break;

	}

}

/**
 * This function parses '@uses' tags.
 *
 * @access public
 * @param {object} item A generator information object.
 * @param {object} tag Tag data produced by Dox
 * @returns {void} All modifications are made ByRef
 */
function parseUsesTag( item, tag ) {

	// Remove invalid characters from the string
	let str = tag.string.replace( /[^A-Za-z0-9\-,:]/g, '' ).toLowerCase();

	// Split the string by commas
	let arr = str.split(",");

	// Iterate over each value
	_.each( arr, function( val ) {

		let isFound = true;

		// We need to strip away the generator name
		// from the sub-generator name in order to check
		// for its validity.
		let shortName = val;
		if( val.indexOf(":") !== -1 ) {
			let spl = val.split(":");
			shortName = spl[1];
		}

		// Ensure the value provided is
		// an actual, existing, generator
		if( generators.all[ shortName ] === undefined ) {
			wrn("The '" + item.name + "' sub-generator contains a '@uses' tag that references an unknown sub-generator ('" + val + "')!");
			isFound = false;
		}

		// Everything should be ok, so we'll
		// build a object containing information
		// about the uses reference ...
		let refInfo = {
			name: shortName,
			fullName: val,
			found: isFound
		};

		// .. and persist it ..
		item.uses[ refInfo.name ] = refInfo;


	});

}

/**
* This function parses '@creates' tags.
*
* @access public
* @param {object} item A generator information object.
* @param {object} tag Tag data produced by Dox
* @returns {void} All modifications are made ByRef
*/
function parseCreatesTag( item, tag ) {

	// Capture the string
	let str = tag.string;

	// Initialize an info object
	let file = {
		type: "static",
		src: null,
		dest: null
	};

	// Resolve type (static, generated, template)
	// ... if provided
	if( str.indexOf(":") !== -1 ) {
		file.type = _.trim( str.substr( 0, str.indexOf(":") ) ).toLowerCase();
		str = str.substr( ( str.indexOf(":") + 1 ) );
	}

	// Convert to linux path
	str = str.replace("\\", "/");

	// Remove extra slashes
	str = str.replace( /\/+/g, "/" );

	// Process source and destination
	if( str.indexOf("->") !== -1 ) {
		file.src = str.substr( 0, str.indexOf("->") );
		file.dest = str.substr( ( str.indexOf("->") + 2 ) );
	} else {
		file.src = null;
		file.dest = str;
	}
	
	// Trim source path
	if( file.src !== null ) {
		file.src = file.src.replace( /\*+$/, '' );
		file.src = _.trim( file.src );
	}

	// Trim destination path
	if( file.dest !== null ) {
		file.dest = file.dest.replace( /\*+$/, '' );
		file.dest = _.trim( file.dest );
	}

	// Persist it..
	item.creates[ file.dest ] = file;

}

/**
 * This function parses '@promptsFor' tags.
 *
 * @access public
 * @param {object} item A generator information object.
 * @param {object} tag Tag data produced by Dox
 * @returns {void} All modifications are made ByRef
 */
function parsePromptsForTag( item, tag ) {

	// Remove invalid characters from the string
	let str = tag.string.replace( /[^A-Za-z0-9\-,]/g, '' );

	// Split the string by commas
	let arr = str.split(",");

	// Iterate over each value
	_.each( arr, function( val ) {

		// Persist the value
		item.promptsFor[ val ] = val;

	});

}

// ---------


/**
 * This is the main entry point for documentation
 * output, which is executed after all source
 * processing has completed.
 *
 * @access public
 * @returns {void}
 */
function writeDocs() {

	writeScaffoldDocs();
	writePartialDocs();

}

/**
 * This is the entry point for "project scaffold"
 * documentation output.  It will iterate over each
 * item and write a document.
 *
 * @access public
 * @returns {void}
 */
function writeScaffoldDocs() {

	_.each( generators.scaffold, function( data ) {

		// Generate the markdown
		let markdown = generateDocForScaffold( data );

		// Write to file
		writeDocFile(
			PATH.join( ABS_SCAFFOLD_DOC_PATH, data.name + ".md" ),
			markdown
		);

	});

}

/**
 * This function generates the markdown for one "project-scaffold".
 *
 * @access public
 * @param {object} data A generator info object.
 * @returns {string} The markdown document.
 */
function generateDocForScaffold( data ) {

	// Resolve relative path to source
	let srcPath = "../../" + data.paths.rel;

	// Start with the main heading..
	let str = "# Project Scaffold: \"" + GENERATOR_NAME + ":" + data.name + "\" ([source](" + srcPath + "))";
	str += "\n\n";

	// Add the description
	str += data.description;
	str += "\n\n\n";

	// Add the example, if it exists
	if( data.example !== null ) {
		str += "## Usage Example";
		str += "\n\n";
		str += "```";
		str += "\n";
		str += data.example;
		str += "\n";
		str += "```";
		str += "\n\n\n";

	}

	// Included Partials
	if( _.size( data.uses ) > 0 ) {

		str += "## Included Partials";
		str += "\n\n";
		str += "The following [partials](../partials.md) are included when this\n";
		str += "[project scaffold](../project-scaffolds.md) is used/specified:";
		str += "\n\n";

		_.each( data.uses, function( ref ) {

			if( ref.found ) {
				str += "* [" + GENERATOR_NAME + ":" + ref.name + "](../partials/" + ref.name + ".md)";
			} else {
				str += "* " + ref.fullName;
			}
			str += "\n";

		});

		str += "\n_Note: Additional, unlisted, [partials](../partials.md) may be automatically\n";
		str += "included as [partial dependencies](../partials.md#partial-dependency)._\n";
		str += "\n\n";

	}

	// Footer
	str += "# Further Reading\n";
	str += "\n";
	str += "* [Source](" + srcPath + ") - The source code for this [project scaffold](../project-scaffolds.md)\n";
	str += "* [Project Scaffold Listing](./) - Individual docs for each [project scaffold](../project-scaffolds.md)\n";
	str += "* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds\n";
	str += "* [About Partials](../partials.md) - Information about partials\n";
	str += "* [About Sub-Generators](../generators.md) - General information about generators and sub-generators\n";
	str += "* [Project README](../README.md) - Basic project information\n";

	return str;

}

/**
 * This is the entry point for "partial" documentation output.
 * It will iterate over each item and write a document.
 *
 * @access public
 * @returns {void}
 */
function writePartialDocs() {

	_.each( generators.partial, function( data ) {

		// Generate the markdown
		let markdown = generateDocForPartial( data );

		// Write to file
		writeDocFile(
			PATH.join( ABS_PARTIAL_DOC_PATH, data.name + ".md" ),
			markdown
		);

	});

}

/**
 * This function generates the markdown for one "partial".
 *
 * @access public
 * @param {object} data A generator info object.
 * @returns {string} The markdown document.
 */
function generateDocForPartial( data ) {

	// Resolve relative path to source
	let srcPath = "../../" + data.paths.rel;

	// Start with the main heading..
	let str = "# Partial: \"" + GENERATOR_NAME + ":" + data.name + "\" ([source](" + srcPath + "))";
	str += "\n\n";

	// Add the description
	str += data.description;
	str += "\n\n";

	// Add the example, if it exists
	if( data.example !== null ) {
		str += "## Usage Example";
		str += "\n\n";
		str += "```";
		str += "\n";
		str += data.example;
		str += "\n";
		str += "```";
		str += "\n\n\n";

	}

	// Files Created
	if( _.size( data.creates ) > 0 ) {

		str += "## Files Created";
		str += "\n\n";

		_.each( data.creates, function( file ) {

			str += "* `" + file.dest + "` (" + file.type;

			if( file.src !== null ) {
				str += ", [source](../../templates/" + file.src + ")";
			}

			str += ")";
			str += "\n";

		});

		str += "\n\n";

	}

	// Other Operations
	if( data.operations.length > 0 ) {

		str += "## Other Operations";
		str += "\n\n";

		_.each( data.operations, function( op ) {
			str += "* " + op + "\n";
		});

		str += "\n\n";

	}

	// Dependencies
	if( _.size( data.uses ) > 0 ) {

		str += "## Dependencies";
		str += "\n\n";
		str += "This [partial](../partials.md) depends on, and automatically includes:\n";
		str += "\n";

		_.each( data.uses, function( ref ) {

			if( ref.found ) {
				str += "* [" + GENERATOR_NAME + ":" + ref.name + "](../partials/" + ref.name + ".md)";
			} else {
				str += "* " + ref.fullName;
			}
			str += "\n";

		});

		str += "\n\n";

	}

	// Dependents
	let dependents = getSubgeneratorDependents( data.name );

	str += "## Dependents";
	str += "\n\n";

	if( dependents.length > 0 ) {

		str += "This [partial](../partials.md) is included by the following:\n";
		str += "\n";

		_.each( dependents, function( gen ) {

			str += "* [" + GENERATOR_NAME + ":" + gen.name + "]";

			if( gen.type === "scaffold" ) {

				str += "(../project-scaffolds/" + gen.name + ".md)";
				str += " ([project scaffold](../project-scaffolds.md))"

			} else {

				str += "(./" + gen.name + ".md)";
				str += " ([partial](../partials.md))"

			}

			str += "\n";

		});

		str += "\n_Note: Additional, unlisted, [project scaffolds](../project-scaffolds.md) may\n";
		str += "automatically include this [partial](../partials.md) by way of\n";
		str += "[partial dependency](../partials.md#partial-dependency)._\n";


	} else {

		wrn("The '" + data.name + "' partial is not being included by any project scaffolds or other partials!");
		str += "_None, this partial is not currently being used :\\_.\n";

	}
	str += "\n\n";



	// Footer
	str += "# Further Reading\n";
	str += "\n";
	str += "* [Source](" + srcPath + ") - The source code for this [partial](../partials.md)\n";
	str += "* [Partial Listing](./) - Individual docs for each [partial](../partials.md)\n";
	str += "* [About Partials](../partials.md) - Information about partials\n";
	str += "* [About Project Scaffolds](../project-scaffolds.md) - Basic information about project scaffolds\n";
	str += "* [About Sub-Generators](../generators.md) - General information about generators and sub-generators\n";
	str += "* [Project README](../README.md) - Basic project information\n";

	return str;

}

/**
 * This method writes a markdown document to disk.
 *
 * @access public
 * @param {string} dest An absolute path to write the contents to.
 * @param {string} contents The contents of the file.
 * @returns {void}
 */
function writeDocFile( dest, contents ) {
	fs.writeFileSync( dest, contents );
	lg("Wrote document: " + dest);
}

/**
 * Does a reverse lookup on a sub-generator name to  see which, other,
 * sub-generators include it.
 *
 * This function will return both project-scaffolds that use the provided
 * partial and other partials that include it via partial-dependency.
 *
 * @param {string} name The name of the sub-generator to find dependents for
 * @returns {object[]} Generator information objects for all dependents.
 */
function getSubgeneratorDependents( name ) {

	let ret = [];

	_.each( generators.all, function( gen ) {
		_.each( gen.uses, function( ref ) {
			if( ref.name === name || ref.fullName === name ) {
				ret.push( gen );
			}
		});
	});

	return ret;

}


// --------

function lg( str ) {
	console.log( "[build-docs:log] " + str );
}

function dbg( str ) {
	console.log( "[build-docs:dbg] " + str );
}

function wrn( str ) {
	lg( "WARNING! " + str );
}