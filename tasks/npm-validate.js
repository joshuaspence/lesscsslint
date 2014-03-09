'use strict';

var PJV = require('package-json-validator').PJV;

function unary(fn) {
    return function (first) {
        return fn(first);
    };
}

module.exports = function(grunt) {
    grunt.registerTask('npm-validate', 'Opinionated package.json validator', function() {
        var pkg = grunt.file.read('package.json');
        var result = PJV.validate(pkg);

        if (result.errors && result.errors.length) {
            grunt.log.subhead('Errors:');
            result.errors.forEach(unary(grunt.log.error));
        }

        if (result.warnings && result.warnings.length) {
            grunt.log.subhead('Warnings:');
            result.warnings.forEach(unary(grunt.log.warn));
        }

        if (result.recommendations && result.recommendations.length) {
            grunt.log.subhead('Recommendations:');
            result.recommendations.forEach(unary(grunt.log.warn));
        }
    });
};
