#!/usr/bin/env node

/**
 *
 **/
'use strict';

const dox  = require( "dox" );
const klaw = require( "klaw" );
const fs   = require( "fs-extra-promise" );
const _    = require( "lodash" );

let rawTagData 	= {};
let klawOptions = {};
let generators = {
	all: {},
	partials: {},
	scaffolds: {}
};

klaw( "./generators", klawOptions )
	.on( "data", onItemFound )
	.on( "end", onScanEnd );

function onItemFound( item ) {

	if ( _.endsWith( item.path, ".js" )
		&& item.path.indexOf( "depr." ) === -1
		&& item.path.indexOf( "/_" ) === -1 ) {

		parseGeneratorFile( item );

	}

}

function onScanEnd() {
	parseRawTagData();

	console.log( generators.all );

}

function parseGeneratorFile( file ) {

	let p = file.path;
	let store = rawTagData[ p ] = {
		file: file,
		description: null,
		doxData: null
	};

	fs.readFileAsync( file.path ).then(

		function ( bContents ) {

			let strContents = bContents.toString();
			let data = dox.parseComments( strContents );
			let combined = [];

			_.each( data, function( d ) {

				if( store.description === null && d.description.summary !== "" ) {
					store.description = d.description.summary;
				}

				_.each( d.tags, function( tag ) {
					combined.push( tag );
				});

			});

			store.doxData = combined;

		}

	);

}

function parseRawTagData() {

	_.each( rawTagData, function( gen, path ) {

		let name = getGeneratorNameFromPath( path );

		let item = {
			name: name,
			description: gen.description,
			path: getRelativeGeneratorPath( path )
		};

		_.each( gen.doxData, function( tag ) {
			parseOneTag( item, tag );
		});

		generators.all[ name ] = item;

	});

}

function getGeneratorNameFromPath( path ) {

	let ret = null;
	let filename = path;
	let spl = path.split("/");
	return spl[ ( spl.length -2 ) ];

}

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

		case "uses":
			parseUsesTag( item, tag );
			break;

		case "creates":
			parseCreatesTag( item, tag );
			break;

		case "promptsfor":
			parsePromptsForTag( item, tag );
			break;

		// ignore
		case "author":
		case "created":
			break;

		default:
			console.log("--- unknown tag!! ---");
			console.log( tag );
			break;

	}


	//console.log( "-item" );
	//console.log( item );
	//console.log( "-tag" );
	//console.log( tag );

}

function parseUsesTag( item, tag ) {

}

function parseCreatesTag( item, tag ) {

}

function parsePromptsForTag( item, tag ) {

}