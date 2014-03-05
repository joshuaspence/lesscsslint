'use strict';

var _ = require('lodash'),
    less = require('less'),
    path = require('path');

var lessOptions = {
    compress: false,
    cleancss: false,
    optimization: null,
    paths: []
};

module.exports = {
    toCSS: function(inputPath, input, callback) {
        var parser = new(less.Parser)(_.extend(lessOptions, {
            paths: [path.dirname(inputPath)].concat(lessOptions.paths),
            filename: inputPath
        }));
        parser.parse(input, function(err, tree) {
            if (err) {
                callback(err, null, null);
            } else {
                var sm, css = tree.toCSS(_.extend(lessOptions, {
                    sourceMap: true,
                    writeSourceMap: function(sourceMap) {
                        sm = sourceMap;
                    }
                }));

                callback(null, css, sm);
            }
        });
    }
};