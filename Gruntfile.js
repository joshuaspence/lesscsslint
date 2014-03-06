module.exports = function(grunt) {
    'use strict';

    // Configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
            jshint: ['.jshintrc'],
            npm: ['package.json']
        },
        nodeunit: {
            all: ['test/**/*.js']
        },
        release: {
            options: {}
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-release');

    // Register tasks.
    grunt.registerTask('lint', ['jsonlint', 'jshint', 'jscs']);
    grunt.registerTask('test', ['nodeunit']);
    grunt.registerTask('travis', ['lint', 'test']);
    grunt.registerTask('default', ['lint', 'test']);
};
