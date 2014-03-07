'use strict';

module.exports = {
    /**
     * Split a string into a list of values.
     *
     * @param {string} values
     * @return {Array.<string>}
     */
    list: function(values) {
        return values.split(',');
    }
};
