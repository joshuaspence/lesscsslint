'use strict';

/**
 * Split a string into a list of values.
 *
 * @param {string} values
 * @return {Array.<string>}
 */
module.exports.list = function(values) {
    return values.split(',');
};
