'use strict';

var xml = require('xml');

module.exports = {
    id: 'lint-xml',
    name: 'Lint XML format',

    /**
     * Return content to be printed before all file results.
     *
     * @return {string} String to prepend before all results.
     */
    startFormat: function() {
        return '';
    },

    /**
     * Return content to be printed after all file results.
     *
     * @return {string} String to append after all results.
     */
    endFormat: function() {
        return '';
    },

    /**
     * Given CSS lint results for a file, return output for this format.
     *
     * @param {Object} results Linter results.
     * @param {string} filename Relative file path.
     * @return {string} Output for results.
     */
    formatResults: function(results, filename) {
        var messages = results.messages,
            output = [];

        if (messages.length > 0) {
            var file = [{
                _attr: {
                    name: filename
                }
            }];

            messages.forEach(function(message) {
                if (message.rollup) {
                    file.push({
                        issue: {
                            _attr: {
                                severity: message.type,
                                rule: message.rule.id,
                                reason: message.message,
                                evidence: message.evidence
                            }
                        }
                    });
                } else {
                    file.push({
                        issue: {
                            _attr: {
                                line: message.line,
                                char: message.col,
                                severity: message.type,
                                rule: message.rule.id,
                                reason: message.message,
                                evidence: message.evidence
                            }
                        }
                    });
                }
            });

            output.push({file: file});
        }

        return xml({lint: output}, {declaration: true});
    }
};
