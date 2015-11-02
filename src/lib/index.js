import express from 'express';

let rootExpressApp = express();

// a map structure storing registered apps
let appMap = {};

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