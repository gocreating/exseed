'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;
exports.init = init;
exports.getApps = getApps;
exports.registerApp = registerApp;
exports.run = run;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootExpressApp = (0, _express2.default)();

// a map structure storing registered apps
var appMap = {};

var appSettings = {};

function init(customSettings) {
  (0, _objectAssign2.default)(appSettings, customSettings);
}

var App = exports.App = function App(expressApp) {
  _classCallCheck(this, App);

  this.expressApp = expressApp;
};

function getApps() {
  return appMap;
}

function registerApp(appName, appClass) {
  var expressApp = (0, _express2.default)();
  var appInstance = new appClass(expressApp);
  appMap[appName] = appInstance;
  return appInstance;
}

function run(cb) {
  for (var appName in appMap) {
    var exseedApp = appMap[appName];
    rootExpressApp.use('/', exseedApp.expressApp);
    exseedApp.routing(exseedApp.expressApp);
  }
  cb(rootExpressApp);
}