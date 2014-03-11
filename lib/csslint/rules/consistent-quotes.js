'use strict';

/**
 * Rule: Check for consistency in quotes.
 *
 * @link https://github.com/jakefolio/csslint/commit/c678f25ae15ccbb1d2c6708be402d9decdb993e5
 */
module.exports = {
    id: 'consistent-quotes',
    name: 'Check for consistency in quotes',
    desc: 'Determine if quotes are being consistent between single and double quotes',

    defaultValue: 'single',
    value: undefined,
    messages: {
        single: 'Use single quotes for property values, do not use double quotes.',
        double: 'Use double quotes for property values, do not use single quotes.',
    },

    init: function(parser, reporter) {
        var rule = this;
        var ruleValue = rule.value || rule.defaultValue;

        parser.addListener('property', function(event) {
            var stream = this._tokenStream;

            if (!rule.evaluate(event.value.text)) {
                reporter.report(rule.messages[ruleValue], stream._token.startLine, stream._token.endCol, rule);
            }
        });
    },

    evaluate: function(propertyValue) {
        var rule = this;
        var ruleValue = rule.value || rule.defaultValue;

        if (ruleValue === 'single' && propertyValue.match(/["]([^"]*)["]/)) {
            return false;
        }

        if (ruleValue === 'double' && propertyValue.match(/[']([^']*)[']/)) {
            return false;
        }

        return true;
    }
};
