'use strict';

/**
 * Inspired by XKCD 936 and stingkybad
 * http://xkcd.com/936/
 * http://stingkybad.com/
 *
 * Choosing from
 *	496 adjectives
 *	2989 nouns ^ 2
 *	996 verbs
 * A total 4.4 trillion possible passwords can be generated with very long
 * bit count that is hard to brute force provided the dictionary is not available.
 */

var fs = require('fs');

var nouns = fs.readFileSync('nouns.txt').toString().split('\n');
var adjs = fs.readFileSync('adj.txt').toString().split('\n');
var verbs = fs.readFileSync('verbs.txt').toString().split('\n');

exports.newPassword = function(){
	var adj = adjs[Math.floor(adjs.length * Math.random())];
	var noun1 = nouns[Math.floor(nouns.length * Math.random())];
	var noun2 = nouns[Math.floor(nouns.length * Math.random())];
	var verb = verbs[Math.floor(verbs.length * Math.random())];
	return [adj, noun1, verb, noun2].join(' ');
};
