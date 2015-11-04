'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = exports.env = undefined;
exports.init = init;
exports.getApps = getApps;
exports.registerApp = registerApp;
exports.registerModel = registerModel;
exports.run = run;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _waterline = require('waterline');

var _waterline2 = _interopRequireDefault(_waterline);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var env = exports.env = process.env.NODE_ENV || 'development';

var rootExpressApp = (0, _express2.default)();

// a map structure storing registered apps
var appMap = {};
var appSettings = {};

var waterline = new _waterline2.default();

function init(customSettings, cb) {
  (0, _objectAssign2.default)(appSettings, customSettings);

  // initialize ORM
  waterline.initialize(appSettings.db[env], function (err, ontology) {
    if (err) {
      return cb(err);
    }
    cb(null, ontology.collections);
  });
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

function registerModel(schema) {
  var collection = _waterline2.default.Collection.extend(schema);
  waterline.loadCollection(collection);
}

function run(cb) {
  for (var appName in appMap) {
    var exseedApp = appMap[appName];
    rootExpressApp.use('/', exseedApp.expressApp);
    exseedApp.routing(exseedApp.expressApp);
  }
  cb(rootExpressApp);
}