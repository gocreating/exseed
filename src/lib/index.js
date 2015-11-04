import express from 'express';
import assign from 'object-assign';

let rootExpressApp = express();

// a map structure storing registered apps
let appMap = {};

let appSettings = {};

export function init(customSettings) {
  assign(appSettings, customSettings);
}

export class App {
  constructor(expressApp) {
    this.expressApp = expressApp;
  }
}

export function getApps() {
  return appMap;
}

export function registerApp(appName, appClass) {
  const expressApp = express();
  const appInstance = new appClass(expressApp);
  appMap[appName] = appInstance;
  return appInstance;
}

export function run(cb) {
  for (let appName in appMap) {
    let exseedApp = appMap[appName];
    rootExpressApp.use('/', exseedApp.expressApp);
    exseedApp.routing(exseedApp.expressApp);
  }
  cb(rootExpressApp);
}