/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require('fs');

exports.accessibilityTests = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  matchReports: function(test) {

    var actual;
    var expected;

    test.expect(2);

    actual = fs.existsSync('reports/txt/test.txt');
    expected = fs.existsSync('test/expected/txt/test.txt');
    test.equal(actual, expected, 'Should produce a TXT report without DOM element for a test file');

    actual = fs.existsSync('reports/json/test.json');
    expected = fs.existsSync('test/expected/json/test.json');
    test.equal(actual, expected, 'Should produce a JSON report without DOM element for a test file');

    test.done();
  }
};
