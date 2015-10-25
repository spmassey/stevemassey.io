/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    uglify2: {
                        mangle: false
                    },
                    preserveLicenseComments: true,
                    fileExclusionRegExp: /google/,
                    baseUrl: "app/js",
                    mainConfigFile: "app/js/require-config.js",
                    name: "boot",
                    out: "app/dist/bundle.js",
                    optimize: 'uglify2'
                }
            }
        },
        shell: {
            updateServiceVersion: {
                command: function (version) {
                    return './update-version.py -v ' + version
                }
            },
            tagGit: {
                command: function (version) {
                    return 'git tag -a v' + version + ' -m "' + version + '"';
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-shell');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['requirejs']);

    var tasks = [];

    if (grunt.option('update-service-version')) {
        tasks.push('shell:updateServiceVersion:<%= pkg.version %>');
    }

    if (grunt.option('requirejs')) {
        tasks.push('requirejs');
    }

    if (grunt.option('tag')) {
        tasks.push('shell:tagGit:<%= pkg.version %>');
    }

    if (0 == tasks.length) {
        tasks.push('shell:updateServiceVersion:<%= pkg.version %>');
        tasks.push('requirejs');
        tasks.push('shell:tagGit:<%= pkg.version %>');
    }

    // By default, lint and run all tests.
    grunt.registerTask('default', tasks);

    console.log("\nNOTE: Don't forget to use --follow-tags with your 'git push' e.g.: 'git push --follow-tags'\n");
};