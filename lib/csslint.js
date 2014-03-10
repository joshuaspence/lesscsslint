'use strict';

// Dependencies.
var csslint = require('csslint');

/**
 * A module for applying CSSLint to LESS.
 *
 * @augments csslint
 * @module csslint
 */
module.exports = csslint;

csslint.CSSLint.addFormatter(require('./csslint/formatters/lint-xml.js'));
csslint.CSSLint.addRule(require('./csslint/rules/ids.js'));
