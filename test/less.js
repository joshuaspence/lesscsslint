'use strict';

var fs = require('fs'),
    less = require('../lib/less'),
    path = require('path');

module.exports = (function() {
    var tests = {};

    fs.readdirSync('test/less').forEach(function(file) {
        if (!/\.less/.test(file)) {
            return;
        }

        if (file === 'utility.less') {
            return;
        }

        tests[file] = function(test) {
            var basename = path.basename(file, '.less');
            file = path.join('test/less', file);

            test.expect(6);

            fs.readFile(file, 'utf8', function(err, data) {
                test.ifError(err);

                less.toCSS(file, data, function(err, css, sourceMap) {
                    test.ifError(err);

                    fs.readFile(path.join('test/less', basename + '.css'), 'utf8', function(err, expectedCss) {
                        test.ifError(err);
                        test.equal(css, expectedCss);

                        fs.readFile(path.join('test/less', basename + '.css.map'), 'utf8', function(err, expectedSourceMap) {
                            test.ifError(err);
                            test.equal(sourceMap, expectedSourceMap);
                            test.done();
                        });
                    });
                });
            });
        };
    });

    return tests;
}());
