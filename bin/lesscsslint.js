#!/usr/bin/env node
'use strict';

// Dependencies.
var _ = require('lodash'),
    csslint = require('../lib/csslint'),
    fs = require('fs'),
    path = require('path'),
    program = require('commander');

program
    .version(require('../package.json').version)
    .usage('[options] <files>')
    .option('--format <format>', 'Indicate which format to use for output.', 'text')
    .option('--errors <rules>', 'Indicate which CSSLint rules to include as errors.', String.prototype.split)
    .option('--warnings <rules>', 'Indicate which rules to include as warnings.', String.prototype.split)
    .option('--ignore <rules>', 'Indicate which rules to ignore completely.', String.prototype.split);

program.on('--version', function() {
    console.log('csslint: ' + require('csslint').CSSLint.version);
    console.log('less: ' + require('less').version.join('.'));
});

program.parse(process.argv);

// If no inputs are specified, then print usage and exit.
if (!program.args.length) {
    program.outputHelp();
    process.exit(1);
}

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
                console.error(err.toString());
                process.exit(2);
            }

            csslint.verify(input, data, ruleset, function(err, results) {
                if (err) {
                    console.error(err.toString());
                    process.exit(3);
                }

                console.log(csslint.format(results, 'STDIN', program.format));

                if (_(results.messages).size() > 0) {
                    process.exit(4);
                } else {
                    process.exit(0);
                }
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
                    console.error(err.toString());
                    process.exit(3);
                }

                console.log(csslint.format(results, 'STDIN', program.format));

                if (_(results.messages).size() > 0) {
                    process.exit(4);
                } else {
                    process.exit(0);
                }
            });
        });
    }
});
