'use strict';

var fs = require('fs'),
    less = require('../lib/less'),
    path = require('path');

module.exports = (function() {
    var tests = {};

    fs.readdirSync('test/fixtures').filter(function(file) {
        return /\.less$/.test(file);
    }).forEach(function(file) {
        tests[file] = function(test) {
            var basename = path.basename(file, '.less');
            file = path.join('test/fixtures', file);

            test.expect(6);

            fs.readFile(file, 'utf8', function(err, data) {
                test.ifError(err);

                less.toCSS(file, data, function(err, css, sourceMap) {
                    test.ifError(err);

                    fs.readFile(path.join('test/fixtures', basename + '.css'), 'utf8', function(err, expectedCss) {
                        test.ifError(err);
                        test.equal(css, expectedCss);

                        fs.exists(path.join('test/fixtures', basename + '.css.map'), function(exists) {
                            if (exists) {
                                fs.readFile(path.join('test/fixtures', basename + '.css.map'), 'utf8', function(err, expectedSourceMap) {
                                    test.ifError(err);
                                    test.equal(sourceMap, expectedSourceMap);
                                    test.done();
                                });
                            } else {
                                test.expect(5);
                                test.equal(sourceMap, undefined);
                                test.done();
                            }
                        });
                    });
                });
            });
        };
    });

    return tests;
}());
