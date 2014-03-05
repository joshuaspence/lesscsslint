#!/usr/bin/env node

'use strict';

var _ = require('lodash'),
    csslint = require('../lib/csslint'),
    fs = require('fs'),
    path = require('path'),
    program = require('commander'),
    util = require('../lib/util');

program
    .version(require('../package.json').version)
    .usage('[options] <files>')
    .option('--format <format>', 'Indicate which format to use for output.', 'text')
    .option('--errors <rules>', 'Indicate which CSSLint rules to include as errors.', util.list)
    .option('--warnings <rules>', 'Indicate which rules to include as warnings.', util.list)
    .option('--ignore <rules>', 'Indicate which rules to ignore completely.', util.list)
    .parse(process.argv);

// If no inputs are specified, then print usage and exit.
if (program.args.length === 0) {
    program.outputHelp();
    process.exit(1);
}

// Setup the CSSLint formatter that will be used for output.
var formatter = csslint.getFormatter(program.format);

// Setup the CSSLint rules that will be applied.
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
    if (input !== '-') {
        input = path.resolve(process.cwd(), input);
        fs.readFile(input, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return;
            }

            csslint.verify(input, data, ruleset, function(err, results) {
                if (err) {
                    console.error(err);
                }

                console.log(formatter.formatResults(results, input));
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
            csslint.verify(input, buffer, ruleset, function(err, results) {
                if (err) {
                    console.error(err);
                }

                console.log(formatter.formatResults(results, 'STDIN'));
            });
        });
    }
});
