'use strict';

var util = require('../lib/util');

module.exports.testList = function(test) {
    test.expect(1);
    test.deepEqual(util.list('a,b,c'), ['a', 'b', 'c']);
    test.done();
};
