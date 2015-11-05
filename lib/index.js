'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = exports.env = exports.ENV = undefined;
exports.registerApp = registerApp;
exports.registerModel = registerModel;
exports.init = init;
exports.run = run;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _waterline2 = require('waterline');

var _waterline3 = _interopRequireDefault(_waterline2);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// registered app instances
var _appMap = {};

// setting object
var _appSettings = {};

// waterline orm instance
var _waterline = new _waterline3.default();

// the top level express app
var _rootExpressApp = (0, _express2.default)();

/**
 * Environment related variables
 */
var ENV = exports.ENV = process.env.NODE_ENV || 'development';
var env = exports.env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production'
};

/**
 * App class
 * @class
 */

var App = exports.App = (function () {
  /**
   * Generates a new express app,
   * and mount it onto the top level express app
   * @constructs App
   */

  function App() {
    _classCallCheck(this, App);

    /**
     * The express app
     * @member App#expressApp
     */
    this.expressApp = (0, _express2.default)();
    _rootExpressApp.use('/', this.expressApp);
  }

  _createClass(App, [{
    key: 'init',
    value: function init(models) {}
  }]);

  return App;
})();

/**
 * Register an exseed app
 * @param {string} appName - An identifier of exseed app
 * @param {App} AppClass
 *   - An exseed app class declaration extends from App
 */

function registerApp(appName, AppClass) {
  var appInstance = new AppClass();
  _appMap[appName] = appInstance;
  return appInstance;
}

/**
 * Register a waterline model
 * @param {object} schema - A waterline schema definition
 */
function registerModel(schema) {
  var collections = _waterline3.default.Collection.extend(schema);
  _waterline.loadCollection(collections);
}

/**
 * @callback initCallback
 * @param {object} err - An error object
 * @param {object} models - All orm models
 */

/**
 * Initialize waterline orm and iterate through
 * `init` member function of all registered exseed apps
 * @param {object} customSettings - The global settings
 * @param {initCallback} cb - The callback after initialization
 */
function init(customSettings, cb) {
  (0, _objectAssign2.default)(_appSettings, customSettings);

  // initialize ORM
  _waterline.initialize(_appSettings.db[ENV], function (err, ontology) {
    if (err) {
      return cb(err);
    }
    for (var appName in _appMap) {
      var exseedApp = _appMap[appName];
      exseedApp.init(ontology.collections);
    }
    cb(null, ontology.collections);
  });
}

/**
 * @callback runCallback
 * @param {object} err - An error object
 * @param {object} port - The listening port
 */

/**
 * Iterate through `routing` member function of all registered exseed apps
 * and launch the server
 * @param {runCallback} cb - The callback after serving
 */
function run(cb) {
  for (var appName in _appMap) {
    var exseedApp = _appMap[appName];
    exseedApp.routing(exseedApp.expressApp);
  }
  var port = _appSettings.server.port[ENV];
  _rootExpressApp.httpServer = _http2.default.createServer(_rootExpressApp).listen(port, cb.bind(this, _rootExpressApp, port));
}

/**
 * To support both import ways:
 *   import exseed from 'exseed';
 *   import * as exseed from 'exseed';
 */
exports.default = module.exports;