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

        tests[file] = function(test) {
            var basename = path.basename(file, '.less');
            file = path.join('test/less', file);

            test.expect(3);

            csslint.verify(file, fs.readFileSync(file, 'utf8'), csslint.getRuleset(), function(err, results) {
                test.ifError(err);
                fs.readFile(path.join('test/less', basename + '.txt'), 'utf8', function(err, expectedResults) {
                    test.ifError(err);
                    test.equal(formatter.formatResults(results, file), expectedResults);
                    test.done();
                });
            });
        };
    });

    return tests;
}());
