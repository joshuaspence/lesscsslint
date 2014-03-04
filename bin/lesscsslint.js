#!/usr/bin/env node

'use strict';

var _ = require('lodash'),
    program = require('commander'),
    csslint = require('csslint').CSSLint,
    fs = require('fs'),
    less = require('less'),
    path = require('path'),
    SourceMapConsumer = require('source-map').SourceMapConsumer,
    util = require('../lib/util');

var lessOptions = {
    compress: false,
    cleancss: false,
    optimization: null,
    paths: []
};

var parseLessFile = function(input, data) {
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

            results = csslint.verify(css, ruleset);

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

program
    .version(require('../package.json').version)
    .usage('[options] <files>')
    .option('--format <format>', 'Indicate which format to use for output.', 'text')
    .option('--errors <rules>', 'Indicate which CSSLint rules to include as errors.', util.list)
    .option('--warnings <rules>', 'Indicate which rules to include as warnings.', util.list)
    .option('--ignore <rules>', 'Indicate which rules to ignore completely.', util.list)
    .parse(process.argv);

if (program.args.length === 0) {
    program.outputHelp();
    process.exit(1);
}

_(program.args).forEach(function(input) {
    if (input !== '-') {
        input = path.resolve(process.cwd(), input);
        fs.readFile(input, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return;
            }

            parseLessFile(input, data);
        });
    } else {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        var buffer = '';
        process.stdin.on('data', function(data) {
            buffer += data;
        });

        process.stdin.on('end', function() {
            parseLessFile(null, buffer);
        });
    }
});
