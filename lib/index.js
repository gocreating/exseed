'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = exports.env = exports.ENV = undefined;
exports.getApps = getApps;
exports.registerApp = registerApp;
exports.registerModel = registerModel;
exports.init = init;
exports.run = run;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENV = exports.ENV = process.env.NODE_ENV || 'development';
var env = exports.env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production'
};

var rootExpressApp = (0, _express2.default)();

// a map structure storing registered apps
var appMap = {};
var appSettings = {};

var waterline = new _waterline2.default();

var App = exports.App = (function () {
  function App(expressApp) {
    _classCallCheck(this, App);

    this.expressApp = expressApp;
  }

  _createClass(App, [{
    key: 'init',
    value: function init(models) {}
  }]);

  return App;
})();

function getApps() {
  return appMap;
}

function registerApp(appName, appClass) {
  var expressApp = (0, _express2.default)();
  var appInstance = new appClass(expressApp);
  appMap[appName] = appInstance;
  return appInstance;
}

function registerModel(schema) {
  var collection = _waterline2.default.Collection.extend(schema);
  waterline.loadCollection(collection);
}

function init(customSettings, cb) {
  (0, _objectAssign2.default)(appSettings, customSettings);

  // initialize ORM
  waterline.initialize(appSettings.db[ENV], function (err, ontology) {
    if (err) {
      return cb(err);
    }
    for (var appName in appMap) {
      var exseedApp = appMap[appName];
      exseedApp.init(ontology.collections);
    }
    cb(null, ontology.collections);
  });
}

function run(cb) {
  for (var appName in appMap) {
    var exseedApp = appMap[appName];
    rootExpressApp.use('/', exseedApp.expressApp);
    exseedApp.routing(exseedApp.expressApp);
  }
  var port = appSettings.server.port[ENV];
  rootExpressApp.httpServer = _http2.default.createServer(rootExpressApp).listen(port, cb.bind(this, rootExpressApp, port));
}