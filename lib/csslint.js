'use strict';

var _ = require('lodash'),
    program = require('commander'),
    csslint = require('csslint').CSSLint,
    less = require('less'),
    path = require('path'),
    SourceMapConsumer = require('source-map').SourceMapConsumer;

var lessOptions = {
    compress: false,
    cleancss: false,
    optimization: null,
    paths: []
};

csslint.verifyLess = function(input, data) {
    if (input) {
        lessOptions.paths = [path.dirname(input)].concat(lessOptions.paths);
    }
    lessOptions.filename = input;

    var smc;

    var parser = new(less.Parser)(lessOptions);
    parser.parse(data, function(err, tree) {
        if (err) {
            console.error(err);
            return;
        } else {
            var css = tree.toCSS(_.extend(lessOptions, {
                sourceMap: true,
                writeSourceMap: function(sourceMap) {
                    smc = new SourceMapConsumer(sourceMap);
                }
            }));

            var ruleset = csslint.getRuleset();
            csslint.getRules().forEach(function(rule) {
                if (_.contains(program.errors, rule)) {
                    ruleset[rule.id] = 2;
                } else if (_.contains(program.warnings, rule)) {
                    ruleset[rule.id] = 1;
                } else if (_.contains(program.ignore, rule)) {
                    ruleset[rule.id] = 0;
                }
            });

            var results = csslint.verify(css, ruleset);

            results.messages = _(results.messages).filter(function(message) {
                var position = smc.originalPositionFor({
                    line: message.line,
                    column: message.col
                });

                if (position.source !== (input || 'input')) {
                    return false;
                }

                message.line = position.line;
                message.column = position.column;
                return true;
            });

            var formatter = csslint.getFormatter(program.format);
            console.log(formatter.formatResults(results, input || 'STDIN'));
        }
    });
};

module.exports = csslint;
