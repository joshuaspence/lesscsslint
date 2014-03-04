#!/usr/bin/env node

'use strict';

var _ = require('lodash'),
    csslint = require('../lib/csslint'),
    fs = require('fs'),
    path = require('path'),
    program = require('../lib/cli').parse(process.argv);

if (program.args.length === 0) {
    program.outputHelp();
    process.exit(1);
}

var formatter = csslint.getFormatter(program.format);
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

_(program.args).forEach(function(input) {
    var lintLess = function(data, callback) {
        csslint.verify(data, ruleset, function(results) {
            var smc = csslint.getSourceMapConsumer();

            results.messages = _(results.messages).filter(function(message) {
                var position = smc.originalPositionFor({
                    line: message.line,
                    column: message.col
                });

                if (position.source !== input && !(position.source === 'input' && input === '-')) {
                    return false;
                }

                message.line = position.line;
                message.column = position.column;
                return true;
            });

            callback(results);
        });
    };

    if (input !== '-') {
        input = path.resolve(process.cwd(), input);
        fs.readFile(input, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return;
            }

            csslint.setLessFile(input);
            lintLess(data, function(results) {
                console.log(formatter.formatResults(results, input || 'STDIN'));
            });
        });
    } else {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        var buffer = '';
        process.stdin.on('data', function(data) {
            buffer += data;
        });

        process.stdin.on('end', function() {
            lintLess(buffer, function(results) {
                console.log(formatter.formatResults(results, input || 'STDIN'));
            });
        });
    }
});
