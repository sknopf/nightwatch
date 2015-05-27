var util = require('util');
var events = require('events');
var BaseAssertion = require('./_baseAssertion.js');

function EnabledAssertion() {
  BaseAssertion.call(this);

  this.message = 'Expected element <%s> to ' + (this.negate ? 'not be enabled' : 'be enabled');
  this.start();
}

util.inherits(EnabledAssertion, BaseAssertion);

EnabledAssertion.prototype.executeCommand = function(callback) {
  this.protocol.elementIdEnabled(this.elementResult.ELEMENT, callback);
};

EnabledAssertion.prototype.elementFound = function() {
  if (this.retries > 0) {
    return;
  }

  this.passed = this.negate ? !this.resultValue : this.resultValue;
  this.expected = this.negate ? 'not enabled' : 'enabled';
  this.actual = this.resultValue ? 'enabled' : 'not enabled';

  if (this.passed && this.waitForMs) {
    this.elapsedTime = this.getElapsedTime();
    this.messageParts.push(' - condition was met in ' + this.elapsedTime + 'ms');
  }
};

EnabledAssertion.prototype.elementNotFound = function() {
  this.passed = false;
};

EnabledAssertion.prototype.retryCommand = function() {
  this.onPromiseResolved();
};

module.exports = EnabledAssertion;
