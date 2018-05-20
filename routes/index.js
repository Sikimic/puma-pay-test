'use strict';

var path 	= require('path');
var glob 	= require('glob');
var env 	= process.env.NODE_ENV || 'DEBUG';

module.exports = (router) => {
	glob.sync(__dirname + '/../modules/*/index.js' ).forEach( function( file ) {
    	require(path.resolve( file )) (router);
	});
};