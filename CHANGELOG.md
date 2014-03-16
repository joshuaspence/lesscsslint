0.5.5 / 2014-03-12
==================

  * Move `npm-validate` task into a standalone package.

0.5.4 / 2014-03-11
==================

  * Rename `test/less` directory to `test/fixtures`.
  * Add "rule" as a safe context keyword for JSCS.
  * Add a `consistent-quotes` rule for CSSLint.

0.5.3 / 2014-03-11
==================

  * Update main script for NPM.
  * Add test fixtures for linting raw CSS.
  * Rename linter output test fixture from `*.lint` to `*.less.lint`.
  * Tightened testing fixture regex.
  * Renamed linter output text fixtures from `*.txt` to `*.lint`.
  * Separate `lint` module functions into `lintCSS` and `lintLESS`.
  * Monkey patch `csslint.CSSLint.verify` to allow linting empty files.
  * Remove file extension from `require` call.
  * Split `csslint` module into `csslint` and `lint` modules.

0.5.2 / 2014-03-10
==================

  * Using an ID in a selector should report first ID column.
  * Fix column number for lint messages.

0.5.1 / 2014-03-10
==================

  * Replace CSSLint `lint-xml` formatter with a more powerful formatter.

0.5.0 / 2014-03-10
==================

  * Fix filtering rulesets.

0.4.0 / 2014-03-10
==================

  * Fix bug with splitting string on comma.
  * Move the `npm-validate` task to the `validate` task group.

0.3.5 / 2014-03-10
==================

  * Create a `release` task which lints, tests and then bumps the version.
  * Rename `release` task to `bump`.
  * Add an `npm-validate` task for grunt.
  * Updated `grunt` dependency to v0.4.3.
  * Alphabetical order.
  * Convert license to Markdown.
  * Revert "Don't explicitly label the MIT license."
  * Revert "Change indentation of `package.json` to 4 spaces."

0.3.4 / 2014-03-10
==================

  * Change indentation of `package.json` to 4 spaces.
  * Remove `preferGlobal` option.
  * Specify `main` script for NPM.
  * Fix typo.
  * Minor fix.
  * Don't explicitly label the MIT license.
  * Minor change for README.
  * Add URLs for "CSSLint" and "Less".
  * Minor README change.
  * Simplify source for Travis badge.
  * Minor change to image `alt` text in README.
  * Replace "NodeICO" with "Version Badge".
  * Improve README.
  * Minor markdown change.
  * Re-arrange editor config.
  * Minor change to editor config.
  * Revert "Add a comment."
  * Enable global `use strict` mode in Gruntfile.

0.3.3 / 2014-03-07
==================

  * Consolidate Sublime Text entries in `.npmignore`.
  * Revert "This file doesn't need to be ignored by NPM."
  * Minor comment changes.

0.3.2 / 2014-03-07
==================

  * Use `String.prototype.split` instead of custom `util.list` function.
  * Minor comment changes.
  * Don't expose the original CSSLint `verify` function.
  * Add `@module` JSDoc comments.
  * Add `@augments` JSDoc to `csslint` module.
  * Minor simplification of `util` module.
  * Minor change.
  * Add JSDoc comments.
  * Simplify `less` module.
  * Validate JSDoc comments with `jscs`.
  * Explain an ugly hack.
  * Remove empty configuration from `Gruntfile.js`.
  * Make Travis both lint and test the project.
  * Add a `travis` task for grunt.
  * Allow double quotes to be used if it avoids having to use an escape.
  * Add missing semicolon.
  * Disable the JSHint `freeze` rule.
  * Minor commenting changes.
  * Add NodeICO to README.
  * Fixed `file_exclude_patern` for Sublime Text.
  * Add some additional keywords.
  * Add license URL.
  * Added period at end of sentence.

0.3.1 / 2014-03-06
==================

  * Don't raise duplicate lint messages.

0.3.0 / 2014-03-06
==================

  * Add an empty LESS test case.
  * Allow testing files which do not produce a source map.
  * Enable a test case which was failing previously.
  * Don't interpret a non-existent source map.
  * Hack to allow CSSLint to (successfully) lint an empty file.
  * Added some better test cases.

0.2.4
=====
  * Fixed linter output for test cases.
  * Don't insert final newlines for text testing files.
  * Tightened editorconfig rules.
  * Fixed output issue caused by using the `lodash` wrapper.
  * Made test case more complicated.
  * Added a test for the main binary script.
  * Added an additional test case which lints successfully.

0.2.3
=====
  * Prefer global installation.
  * Reorder NPM package specification.
  * Add a comment.
  * YAML files typically have an `indent_size` of 2.
  * Remove maintainers from NPM package specification.
  * Use the MIT license.
  * Allow `fast_finish` with Travis CI.
  * Test the package on node.js v0.11.0 (development version).
  * Minor change.
  * Added `csslint` and `less` version output.
  * Fixed minor `jscs` lint errors.
  * Added additional JavaScript linting with `jscs`.
  * Quoted `node_js` version for Travis.

0.2.2
=====
  * Added additional test cases.
  * Minor formatting changes.
  * Prefer asynchronous reading of test files.

0.2.1
=====
  * Fixed error messages.

0.2.0
=====
  * Fixed exit codes.
  * Added some comments.

0.1.0
=====
  * Renamed unit tests.
  * Added unit tests for `csslint` module.
  * Don't lint line length in JavaScript files.
  * Added unit tests for the `less` module.
  * Reference test files using a template variable.
  * Changed grunt target name.
  * Added unit tests for the `util` module.

0.0.5
=====
  * Prefer my personal email address.
  * Revert "Changed NPM `test` script for Travis CI."
  * This file doesn't need to be ignored by NPM.

0.0.4
=====
  * Made code more modular.
  * Revert "Added a `ci` task for `grunt`."
  * Added package metadata to `Gruntfile.js`.
  * Added a (pretty bare) README.
  * `npm` enforces that `package.json` has an indent size of two spaces.
  * Changed NPM `test` script for Travis CI.

0.0.3
=====
  * Added a `ci` task for `grunt`.
  * Added a placeholder `.travis.yml` file for Travis CI integration.
  * Renamed main executable.
  * Moved `list` function to `lib` directory.
  * Use a `lib` directory instead of a `src` directory.
  * Added placeholders for unit tests.
  * Explicitly specify `node` engine dependency.
  * Fixed repository URL for NPM.
  * Fixed gitignore path.

0.0.2
=====
  * Allow specify CSSLint `ignore`, `warnings` and `errors` options at the command line.
  * Show usage text if there are no inputs provided.
  * Fixed usage text.
  * Complain when there is no input.
  * Allow multiple paths to be linted.
  * Allow command line specification of a formatter.

0.0.1
=====
  * Initial commit.
