"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApps = getApps;
exports.registerApp = registerApp;
exports.run = run;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// a map structure storing registered apps
var appMap = {};

var App = exports.App = function App() {
  _classCallCheck(this, App);
};

function getApps() {
  return appMap;
}

function registerApp(appName, appClass) {
  appMap[appName] = appClass;
}

function run(cb) {
  cb();
}