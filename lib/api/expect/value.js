var util = require('util');
var events = require('events');
var BaseAssertion = require('./_baseAssertion.js');

function ValueAssertion() {
  this.flag('valueFlag', true);

  BaseAssertion.call(this);

  this.message = 'Expected element <%s> to have value' + (this.negate ? ' not' : '');
  this.start();
}

util.inherits(ValueAssertion, BaseAssertion);

ValueAssertion.prototype.executeCommand = function(callback) {
  this.protocol.elementIdValue(this.elementResult.ELEMENT, callback);
};

ValueAssertion.prototype.elementFound = function() {
  if (this.retries > 0 && this.negate) {
    return;
  }
  if (!this.hasCondition()) {
    this.passed = this.negate ? false : true;
    this.expected = this.negate ? 'not found' : 'found';
    this.actual = 'found';
  }

  if (this.passed && this.waitForMs) {
    var message = '';
    if (this.hasCondition()) {
      message = 'condition was met';
    }
    this.elapsedTime = this.getElapsedTime();
    this.messageParts.push(' - ' + message + ' in ' + this.elapsedTime + 'ms');
  }
};

ValueAssertion.prototype.elementNotFound = function() {
  this.passed = false;
};

ValueAssertion.prototype.retryCommand = function() {
  this.onPromiseResolved();
};

module.exports = ValueAssertion;