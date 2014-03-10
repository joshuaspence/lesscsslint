'use strict';

module.exports = {
    id: 'ids',
    name: 'Disallow IDs in selectors',
    desc: 'Selectors should not contain IDs.',
    browsers: 'All',

    init: function(parser, reporter) {
        var self = this;

        parser.addListener('startrule', function(event) {
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                idCount,
                firstIdCol,
                i, j, k;

            for (i = 0; i < selectors.length; i++) {
                selector = selectors[i];
                idCount = 0;

                for (j = 0; j < selector.parts.length; j++) {
                    part = selector.parts[j];
                    if (part.type === parser.SELECTOR_PART_TYPE) {
                        for (k = 0; k < part.modifiers.length; k++) {
                            modifier = part.modifiers[k];
                            if (modifier.type === 'id') {
                                if (!firstIdCol) {
                                    firstIdCol = part.col;
                                }
                                idCount++;
                            }
                        }
                    }
                }

                if (idCount === 1) {
                    reporter.report("Don't use IDs in selectors.", selector.line, firstIdCol, self);
                } else if (idCount > 1) {
                    reporter.report(idCount + ' IDs in the selector, really?', selector.line, firstIdCol, self);
                }
            }
        });
    }
};
