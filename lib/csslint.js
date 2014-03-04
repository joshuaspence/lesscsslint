'use strict';

var _ = require('lodash'),
    program = require('commander'),
    csslint = require('csslint').CSSLint,
    less = require('less'),
    path = require('path'),
    SourceMapConsumer = require('source-map').SourceMapConsumer;

var lessOptions = {
    compress: false,
    cleancss: false,
    optimization: null,
    paths: []
};

csslint._verify = csslint.verify;

var smc;

csslint.verify = function(data, ruleset, callback) {
    var parser = new(less.Parser)(lessOptions);
    parser.parse(data, function(err, tree) {
        if (err) {
            console.error(err);
            return;
        } else {
            var css = tree.toCSS(_.extend(lessOptions, {
                sourceMap: true,
                writeSourceMap: function(sourceMap) {
                    smc = new SourceMapConsumer(sourceMap);
                }
            }));

            callback(csslint._verify(css, ruleset));
        }
    });
};

csslint.setLessFile = function(input) {
    lessOptions.paths = [path.dirname(input)].concat(lessOptions.paths);
    lessOptions.filename = input;
};

csslint.getSourceMapConsumer = function() {
    return smc;
};

module.exports = csslint;
