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

        var smc = new SourceMapConsumer(sourceMap);
        var results = csslint._verify(css || '/**/', ruleset);

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

        callback(null, results);
    });
};
module.exports = csslint;
