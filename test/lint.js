'use strict';

var csslint = require('../lib/csslint').CSSLint,
    fs = require('fs'),
    lint = require('../lib/lint'),
    path = require('path');

var formatter = csslint.getFormatter('compact');

module.exports = (function() {
    var tests = {};

    fs.readdirSync('test/fixtures').filter(function(file) {
        return /\.less$/.test(file);
    }).forEach(function(file) {
        tests[file] = function(test) {
            var basename = path.basename(file, '.less');
            file = path.join('test/fixtures', file);

            test.expect(4);

            fs.readFile(file, 'utf8', function(err, data) {
                test.ifError(err);

                lint.lintLESS(file, data, csslint.getRuleset(), function(err, results) {
                    test.ifError(err);

                    fs.readFile(path.join('test/fixtures', basename + '.less.lint'), 'utf8', function(err, expectedResults) {
                        test.ifError(err);
                        test.equal(formatter.formatResults(results, file), expectedResults);
                        test.done();
                    });
                });
            });
        };
    });

    fs.readdirSync('test/fixtures').filter(function(file) {
        return /\.css$/.test(file);
    }).forEach(function(file) {
        tests[file] = function(test) {
            var basename = path.basename(file, '.css');
            file = path.join('test/fixtures', file);

            test.expect(4);

            fs.readFile(file, 'utf8', function(err, data) {
                test.ifError(err);

                lint.lintCSS(file, data, csslint.getRuleset(), function(err, results) {
                    test.ifError(err);

                    fs.readFile(path.join('test/fixtures', basename + '.css.lint'), 'utf8', function(err, expectedResults) {
                        test.ifError(err);
                        test.equal(formatter.formatResults(results, file), expectedResults);
                        test.done();
                    });
                });
            });
        };
    });

    return tests;
}());
