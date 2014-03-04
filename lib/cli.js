'use strict';

var program = require('commander'),
    util = require('../lib/util');

module.exports = program
    .version(require('../package.json').version)
    .usage('[options] <files>')
    .option('--format <format>', 'Indicate which format to use for output.', 'text')
    .option('--errors <rules>', 'Indicate which CSSLint rules to include as errors.', util.list)
    .option('--warnings <rules>', 'Indicate which rules to include as warnings.', util.list)
    .option('--ignore <rules>', 'Indicate which rules to ignore completely.', util.list);
