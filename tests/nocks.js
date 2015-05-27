var nock = require('nock');

module.exports = {
  elementFound : function() {
    nock('http://localhost:10195')
      .post('/wd/hub/session/1352110219202/elements', {"using":"css selector","value":"#weblogin"} )
      .reply(200, {
        status: 0,
        state: 'success',
        value: [ { ELEMENT: '0' } ]
      });
    return this;
  },

  elementNotFound : function() {
    nock('http://localhost:10195')
      .post('/wd/hub/session/1352110219202/elements', {"using":"css selector","value":"#weblogin"} )
      .reply(200, {
        status: 0,
        state: 'success',
        value: []
      });
    return this;
  },

  attributeValue : function (value) {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/attribute/class')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: value,
        state : 'success'
      });
    return this;
  },

  cssProperty : function (value) {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/css/display')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: value,
        state : 'success'
      });
    return this;
  },

  enabled : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/enabled')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: true,
        state : 'success'
      });
    return this;
  },

  notEnabled : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/enabled')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: false,
        state : 'success'
      });
    return this;
  },

  selected : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/selected')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: true,
        state : 'success'
      });
    return this;
  },

  notSelected : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/selected')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: false,
        state : 'success'
      });
    return this;
  },

  visible : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/displayed')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: true,
        state : 'success'
      });
    return this;
  },

  notVisible : function () {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/displayed')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: false,
        state : 'success'
      });
    return this;
  },

  value : function (value) {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/attribute/value')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: value,
        state : 'success'
      });
    return this;
  },

  text : function (value) {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/text')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: value,
        state : 'success'
      });
    return this;
  },

  name : function (value) {
    nock('http://localhost:10195')
      .get('/wd/hub/session/1352110219202/element/0/name')
      .reply(200, {
        status: 0,
        sessionId : '1352110219202',
        value: value,
        state : 'success'
      });
    return this;
  },

  cleanAll : function() {
    nock.cleanAll();
  }
};
