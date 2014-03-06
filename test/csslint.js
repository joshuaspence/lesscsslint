'use strict';

var csslint = require('../lib/csslint'),
    fs = require('fs'),
    path = require('path');

var formatter = csslint.getFormatter('compact');

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

            test.expect(4);

            fs.readFile(file, 'utf8', function(err, data) {
                test.ifError(err);

                csslint.verify(file, data, csslint.getRuleset(), function(err, results) {
                    test.ifError(err);

                    fs.readFile(path.join('test/less', basename + '.txt'), 'utf8', function(err, expectedResults) {
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
