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

csslint.CSSLint.verify = (function() {
    /**
     * The original CSSLint `verify` function.
     */
    var verify = csslint.CSSLint.verify;

    return function(text, ruleset) {
        // If the input CSS is an empty string, then replace the contents
        // with an empty CSS comment. Otherwise, CSSLint won't be able to
        // lint the file.
        //
        // See https://github.com/stubbornella/csslint/pull/463
        return verify(text || '/**/', ruleset);
    };
}());

csslint.CSSLint.addFormatter(require('./csslint/formatters/lint-xml'));
csslint.CSSLint.addRule(require('./csslint/rules/ids'));
