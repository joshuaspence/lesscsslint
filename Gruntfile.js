module.exports = function(grunt) {
    'use strict';

    // Configuration
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            bin: 'bin/**/*.js',
            grunt: 'Gruntfile.js',
            lib: 'lib/**/*.js',
            test: 'test/**/*.js'
        },
        jsonlint: {
            jshint: ['.jshintrc'],
            npm: ['package.json']
        },
        nodeunit: {
            tests: ['test/**/*.js']
        },
        release: {
            options: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-release');

    // Register tasks.
    grunt.registerTask('ci', ['lint', 'test']);
    grunt.registerTask('lint', ['jsonlint', 'jshint']);
    grunt.registerTask('test', ['nodeunit']);
    grunt.registerTask('default', ['lint', 'test']);
};
