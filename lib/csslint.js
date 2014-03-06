'use strict';

var _ = require('lodash'),
    csslint = require('csslint').CSSLint,
    less = require('./less'),
    SourceMapConsumer = require('source-map').SourceMapConsumer;

csslint._verify = csslint.verify;

csslint.verify = function(inputPath, input, ruleset, callback) {
    less.toCSS(inputPath, input, function(err, css, sourceMap) {
        if (err) {
            callback(err);
            return;
        }

        // If the input CSS is an empty string, then replace the contents with
        // an empty CSS comment. Otherwise, CSSLint won't be able to lint the
        // file.
        //
        // See https://github.com/stubbornella/csslint/pull/463
        var results = csslint._verify(css || '/**/', ruleset);

        if (sourceMap) {
            var smc = new SourceMapConsumer(sourceMap);

            results.messages = results.messages.filter(function(message) {
                var position = smc.originalPositionFor({
                    line: message.line,
                    column: message.col
                });

                if (position.source !== (inputPath || 'input')) {
                    return false;
                }

                message.line = position.line;
                message.column = position.column;
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
module.exports = csslint;
