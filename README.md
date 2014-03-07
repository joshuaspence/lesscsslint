lesscsslint
===========

> CSSLint for Less.

[![build status](https://secure.travis-ci.org/joshuaspence/lesscsslint.png)](http://travis-ci.org/joshuaspence/lesscsslint)

[![NPM](https://nodei.co/npm/lesscsslint.png)](https://nodei.co/npm/lesscsslint/)

## Command line interface
Install lesscsslint with [npm](https://www.npmjs.org/) to use the command line
interface:

    npm install -g lesscsslint

Validate a file like so:

    lesscsslint myfile.less

or pipe input into stdin:

    cat myfile.less | lesscsslint

lesscsslint will either report a syntax error with details or exit quietly.

### Options

    $ lesscsslint --help

      Usage: lesscsslint [options] <files>

      Options:

        -h, --help          output usage information
        -V, --version       output the version number
        --format <format>   Indicate which format to use for output.
        --errors <rules>    Indicate which CSSLint rules to include as errors.
        --warnings <rules>  Indicate which rules to include as warnings.
        --ignore <rules>    Indicate which rules to ignore completely.
