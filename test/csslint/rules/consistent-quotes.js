'use strict';

var csslint = require('../../../lib/csslint').CSSLint,
    rule = require('../../../lib/csslint/rules/consistent-quotes');

var ruleset = {};
ruleset[rule.id] = 1;

module.exports = {
    'Single quotes': function(test) {
        test.expect(5);
        rule.value = 'single';
        var results;

        results = csslint.verify('.foo {\nbackground: url("bar.png");\n}', ruleset);
        test.equal(results.messages.length, 1);
        test.equal(results.messages[0].line, 2);
        test.equal(results.messages[0].col, 27);
        test.equal(results.messages[0].rule.id, rule.id);

        results = csslint.verify('.foo {\nbackground: url(\'bar.png\');\n}', ruleset);
        test.equal(results.messages.length, 0);

        test.done();
    },
    'Double quotes': function(test) {
        test.expect(5);
        rule.value = 'double';
        var results;

        results = csslint.verify('.foo {\nbackground: url("bar.png");\n}', ruleset);
        test.equal(results.messages.length, 0);

        results = csslint.verify('.foo {\nbackground: url(\'bar.png\');\n}', ruleset);
        test.equal(results.messages.length, 1);
        test.equal(results.messages[0].line, 2);
        test.equal(results.messages[0].col, 27);
        test.equal(results.messages[0].rule.id, rule.id);

        test.done();
    },
    tearDown: function(callback) {
        callback();
        rule.value = undefined;
    }
};
