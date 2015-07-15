var util   = require('util');
var events = require('events');
var webdriver = require('selenium-webdriver');

function WebdriverCommand() {
  events.EventEmitter.call(this);
}

util.inherits(WebdriverCommand, events.EventEmitter);

WebdriverCommand.prototype.createResultObject = function(status, result) {
  var value;
  if (Array.isArray(result)) {
    value = [];
    result.forEach(function(r) {
      value.push((r instanceof webdriver.WebElement) ? {ELEMENT:r} : r);
    });
  } else {
    value = (result instanceof webdriver.WebElement) ? {ELEMENT:result} : result;
  }

  // TODO get actual sessionId, etc
  return {
    status: status,
    sessionId: '',
    value: value,
    class: '',
    hCode: ''
  };
};

WebdriverCommand.prototype.executeCommand = function() {
  // TODO error checking
  var noopFn = function() {};
  var args  = Array.prototype.slice.call(arguments, 0);
  var lastArg = args[args.length-1];

  if (typeof lastArg === 'undefined') {
    args.pop();
    args.push(noopFn);
  } else if (typeof lastArg !== 'function') {
    args.push(noopFn);
  }

  var obj = args.shift();
  var command = args.shift();
  var callback = args.pop();

  var self = this;

  obj[command].apply(obj, args)
    .then(function(result) {
      result = self.createResultObject(0, result);
      callback.call(self, result);
      self.emit('complete', result, self);
    })
    .then(null, function(err) {
      var result = self.createResultObject(-1, null);
      // TODO other logic
      callback.call(self, result);
      self.emit('complete', result, self);
    });

  return this;
};

module.exports = WebdriverCommand;