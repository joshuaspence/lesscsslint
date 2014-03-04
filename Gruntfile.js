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
            src: 'src/**/*.js'
        },
        jsonlint: {
            jshint: ['.jshintrc'],
            npm: ['package.json']
        },
        release: {
            options: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-release');

    // Register tasks.
    grunt.registerTask('lint', [
        'jsonlint',
        'jshint'
    ]);
    grunt.registerTask('default', [
        'lint'
    ]);
};
