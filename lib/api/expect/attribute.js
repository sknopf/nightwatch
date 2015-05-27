var util = require('util');
var events = require('events');
var BaseAssertion = require('./_baseAssertion.js');

function AttributeAssertion(attribute) {
  this.flag('attributeFlag', true);
  this.attribute = attribute;
  BaseAssertion.call(this);

  this.message = 'Expected element <%s> to ' + (this.negate ? 'not have' : 'have') + ' attribute "' + attribute + '"';
  this.start();
}

util.inherits(AttributeAssertion, BaseAssertion);

AttributeAssertion.prototype.executeCommand = function(callback) {
  this.protocol.elementIdAttribute(this.elementResult.ELEMENT, this.attribute, function(result) {
    if (result.value !== null && result.status === 0) {
      callback(result);
    } else {
      this.attributeNotFound();
    }
  }.bind(this));
};

AttributeAssertion.prototype.elementFound = function() {
  if (this.retries > 0 && this.negate) {
    return;
  }
  if (!this.hasCondition()) {
    this.passed = this.negate ? false : true;
    this.expected = this.negate ? 'not found' : 'found';
    this.actual = 'found';
  }

  if (this.waitForMs && this.passed) {
    var message = 'attribute was present';
    if (this.hasCondition()) {
      message = 'condition was met';
    }
    this.elapsedTime = this.getElapsedTime();
    this.messageParts.push(' - ' + message + ' in ' + this.elapsedTime + 'ms');
  }
};

AttributeAssertion.prototype.attributeNotFound = function() {
  this.processFlags();
  this.passed = this.hasCondition() ? false : this.negate;

  if (!this.passed && this.shouldRetry()) {
    this.scheduleRetry();
  } else {
    if (!this.hasCondition()) {
      this.expected = this.negate ? 'not found' : 'found';
      this.actual = 'not found';
    }

    if (!this.negate) {
      this.messageParts.push(' - attribute was not found');
    }
    this.done();
  }
};

AttributeAssertion.prototype.elementNotFound = function() {
  this.passed = false;
};

AttributeAssertion.prototype.retryCommand = function() {
  this.onPromiseResolved();
};

module.exports = AttributeAssertion;
