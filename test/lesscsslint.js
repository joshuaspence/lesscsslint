'use strict';

var spawn = require('child_process').spawn;

module.exports.errorCodes = {
    fileNotExist: function(test) {
        var lesscsslint = spawn('bin/lesscsslint.js', ['test/less/foo.bar']);

        test.expect(1);
        lesscsslint.on('close', function(code) {
            test.notEqual(code, 0);
            test.done();
        });
    },
    invalidCss: function(test) {
        var lesscsslint = spawn('bin/lesscsslint.js', ['test/less/css.less']);

        test.expect(1);
        lesscsslint.on('close', function(code) {
            test.notEqual(code, 0);
            test.done();
        });
    },
    invalidLess: function(test) {
        var lesscsslint = spawn('bin/lesscsslint.js', ['-']);

        test.expect(1);
        lesscsslint.stdin.write('.foo {');
        lesscsslint.stdin.end();
        lesscsslint.on('close', function(code) {
            test.notEqual(code, 0);
            test.done();
        });
    },
    ok: function(test) {
        var lesscsslint = spawn('bin/lesscsslint.js', ['test/less/ok.less']);

        test.expect(1);
        lesscsslint.on('close', function(code) {
            test.equal(code, 0);
            test.done();
        });
    },
    usage: function(test) {
        var lesscsslint = spawn('bin/lesscsslint.js', []);

        test.expect(1);
        lesscsslint.on('close', function(code) {
            test.notEqual(code, 0);
            test.done();
        });
    }
};
