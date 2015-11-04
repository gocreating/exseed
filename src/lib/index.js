import http from 'http';
import _express from 'express';
import _Waterline from 'waterline';
import assign from 'object-assign';
import async from 'async';

export const ENV = process.env.NODE_ENV || 'development';
export const env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production',
}
export const Waterline = _Waterline;

let rootExpressApp = _express();

// a map structure storing registered apps
let appMap = {};
let appSettings = {};

const _waterline = new _Waterline();


export class App {
  constructor(expressApp) {
    this.expressApp = expressApp;
  }

  init(models) {
  }
}

export function getApps() {
  return appMap;
}

export function registerApp(appName, appClass) {
  const expressApp = _express();
  const appInstance = new appClass(expressApp);
  appMap[appName] = appInstance;
  return appInstance;
}

export function registerModel(schema) {
  let collections = _Waterline.Collection.extend(schema)
  _waterline.loadCollection(collections);
}

export function init(customSettings, cb) {
  assign(appSettings, customSettings);

  // initialize ORM
  _waterline.initialize(appSettings.db[ENV], (err, ontology) => {
    if (err) {
      return cb(err);
    }
    for (let appName in appMap) {
      let exseedApp = appMap[appName];
      exseedApp.init(ontology.collections);
    }
    cb(null, ontology.collections);
  });
}

export function run(cb) {
  for (let appName in appMap) {
    let exseedApp = appMap[appName];
    rootExpressApp.use('/', exseedApp.expressApp);
    exseedApp.routing(exseedApp.expressApp);
  }
  const port = appSettings.server.port[ENV];
  rootExpressApp.httpServer = http
    .createServer(rootExpressApp)
    .listen(port, cb.bind(this, rootExpressApp, port));
}