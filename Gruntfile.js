'use strict';

module.exports = function(grunt) {
    // Configuration.
    grunt.initConfig({
        jscs: {
            options: {
                config: '.jscsrc'
            },
            bin: 'bin/**/*.js',
            grunt: 'Gruntfile.js',
            lib: 'lib/**/*.js',
            test: '<%= nodeunit.all %>'
        },
        jshint: {
            options: {
                jshintrc: true
            },
            bin: 'bin/**/*.js',
            grunt: 'Gruntfile.js',
            lib: 'lib/**/*.js',
            test: '<%= nodeunit.all %>'
        },
        jsonlint: {
            jscs: '.jscsrc',
            jshint: '.jshintrc',
            npm: 'package.json',
            sublime: 'lesscsslint.sublime-project'
        },
        nodeunit: {
            all: 'test/**/*.js'
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-npm-validate');
    grunt.loadNpmTasks('grunt-release');

    // Register tasks.
    grunt.renameTask('release', 'bump');
    grunt.registerTask('lint', ['jsonlint', 'jshint', 'jscs']);
    grunt.registerTask('release', function() {
        var bump = Array.prototype.concat.apply('bump', arguments).join(':');
        grunt.task.run('lint', 'test', 'validate', bump);
    });
    grunt.registerTask('test', ['nodeunit']);
    grunt.registerTask('travis', ['lint', 'test', 'validate']);
    grunt.registerTask('validate', ['npm-validate']);
    grunt.registerTask('default', ['lint', 'test', 'validate']);
};
