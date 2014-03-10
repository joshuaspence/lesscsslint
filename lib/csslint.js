'use strict';

// Dependencies.
var _ = require('lodash'),
    csslint = require('csslint').CSSLint,
    less = require('./less'),
    SourceMapConsumer = require('source-map').SourceMapConsumer;

/**
 * A module for applying CSSLint to LESS.
 *
 * @augments csslint
 * @module csslint
 */
module.exports = csslint;

csslint.verify = (function() {
    /**
     * The original CSSLint `verify` function.
     *
     * @param {string} text
     * @param {Object} ruleset
     */
    var verify = csslint.verify;

    /**
     * Apply the original CSSLint `verify` function to LESS.
     *
     * @param {?string} inputPath
     * @param {string} input
     * @param {Object} ruleset
     * @param {callback} callback
     */
    return function(inputPath, input, ruleset, callback) {
        less.toCSS(inputPath, input, function(err, css, sourceMap) {
            if (err) {
                callback(err);
                return;
            }

            // If the input CSS is an empty string, then replace the contents
            // with an empty CSS comment. Otherwise, CSSLint won't be able to
            // lint the file.
            //
            // See https://github.com/stubbornella/csslint/pull/463
            var results = verify(css || '/**/', ruleset);

            if (sourceMap) {
                var smc = new SourceMapConsumer(sourceMap);

                results.messages = results.messages.filter(function(message) {
                    var position = smc.originalPositionFor({
                        line: message.line,
                        column: message.col - 1
                    });

                    if (position.source !== (inputPath || 'input')) {
                        return false;
                    }

                    message.line = position.line;
                    message.col = position.column + 1;
                    return true;
                });
            }

            // Don't raise duplicate lint issues.
            var registry = [];
            results.messages = results.messages.filter(function(message) {
                var serializedMessage = JSON.stringify(message);

                if (_.contains(registry, serializedMessage)) {
                    return false;
                } else {
                    registry.push(serializedMessage);
                    return true;
                }
            });

            callback(null, results);
        });
    };
}());

csslint.addFormatter(require('./csslint/formatters/lint-xml.js'));
