var Api = require('../../../lib/api.js');
module.exports = {
  setUp: function (callback) {
    callback();
  },

  'containsText assertion passed' : function(test) {
    var assertionFn = require('../../../lib/selenium/assertions/containsText.js');
    var client = {
      options : {},
      api : {
        getText : function(cssSelector, callback) {
          test.equals(cssSelector, '.test_element');
          callback({
            value : 'expected text result'
          });
        }
      },
      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, true);
        test.equals(result, 'expected text result');
        test.equals(expected, 'text result');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };
    Api.init(client);
    var m = Api.createAssertion('containsText', assertionFn, true, client);
    m.command('.test_element', 'text result', 'Test message');
  },

  'containsText assertion failed' : function(test) {
    var assertionFn = require('../../../lib/selenium/assertions/containsText.js');
    var client = {
      options : {},
      api : {
        getText : function(cssSelector, callback) {
          callback({
            value : 'not_expected'
          });
        }
      },
      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, false);
        test.equals(result, 'not_expected');
        test.equals(expected, 'text result');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };
    Api.init(client);
    var m = Api.createAssertion('containsText', assertionFn, true, client);
    m.command('.test_element', 'text result', 'Test message');
  },

  'containsText assertion not found' : function(test) {
    var assertionFn = require('../../../lib/selenium/assertions/containsText.js');
    var client = {
      options : {},
      api : {
        getText : function(cssSelector, callback) {
          callback({
            status : -1
          });
        }
      },
      assertion : function(passed, result, expected, msg, abortOnFailure) {
        test.equals(passed, false);
        test.equals(result, null);
        test.equals(expected, 'text result');
        test.equals(abortOnFailure, true);
        delete assertionFn;
        test.done();
      }
    };
    Api.init(client);
    var m = Api.createAssertion('containsText', assertionFn, true, client);
    m.command('.test_element', 'text result', 'Test message');
  },

  tearDown : function(callback) {
    callback();
  }
}

