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

_(program.args).forEach(function(input) {
    if (input !== '-') {
        input = path.resolve(process.cwd(), input);
        fs.readFile(input, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return;
            }

            csslint.verifyLess(input, data);
        });
    } else {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        var buffer = '';
        process.stdin.on('data', function(data) {
            buffer += data;
        });

        process.stdin.on('end', function() {
            csslint.verifyLess(null, buffer);
        });
    }
});
