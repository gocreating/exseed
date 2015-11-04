import express from 'express';
import Waterline from 'waterline';
import assign from 'object-assign';

export const ENV = process.env.NODE_ENV || 'development';
export const env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production',
}

let rootExpressApp = express();

// a map structure storing registered apps
let appMap = {};
let appSettings = {};

const waterline = new Waterline();


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
  const expressApp = express();
  const appInstance = new appClass(expressApp);
  appMap[appName] = appInstance;
  return appInstance;
}

export function registerModel(schema) {
  const collection = Waterline.Collection.extend(schema);
  waterline.loadCollection(collection);
}

export function init(customSettings, cb) {
  assign(appSettings, customSettings);

  // initialize ORM
  waterline.initialize(appSettings.db[ENV], (err, ontology) => {
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
  cb(rootExpressApp);
}