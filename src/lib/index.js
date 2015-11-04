import http from 'http';
import express from 'express';
import Waterline from 'waterline';
import assign from 'object-assign';
import async from 'async';


// registered app instances
let _appMap = {};

// setting object
let _appSettings = {};

// waterline orm instance
const _waterline = new Waterline();

// the top level express app
const _rootExpressApp = express();

/**
 * Environment related variables
 */
export const ENV = process.env.NODE_ENV || 'development';
export const env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production',
}

/**
 * App class
 * @class
 */
export class App {
  /**
   * Generates a new express app,
   * and mount it onto the top level express app
   * @constructs App
   */
  constructor() {
    /**
     * The express app
     * @member App#expressApp
     */
    this.expressApp = express();
    _rootExpressApp.use('/', this.expressApp);
  }

  init(models) {
  }
}

/**
 * Register an exseed app
 * @param {string} appName - An identifier of exseed app
 * @param {App} appClass
 *   - An exseed app class declaration extends from App
 */
export function registerApp(appName, appClass) {
  const appInstance = new appClass();
  _appMap[appName] = appInstance;
  return appInstance;
}

/**
 * Register a waterline model
 * @param {object} schema - A waterline schema definition
 */
export function registerModel(schema) {
  let collections = Waterline.Collection.extend(schema)
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
export function init(customSettings, cb) {
  assign(_appSettings, customSettings);

  // initialize ORM
  _waterline.initialize(_appSettings.db[ENV], (err, ontology) => {
    if (err) {
      return cb(err);
    }
    for (let appName in _appMap) {
      let exseedApp = _appMap[appName];
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
export function run(cb) {
  for (let appName in _appMap) {
    let exseedApp = _appMap[appName];
    exseedApp.routing(exseedApp.expressApp);
  }
  const port = _appSettings.server.port[ENV];
  _rootExpressApp.httpServer = http
    .createServer(_rootExpressApp)
    .listen(port, cb.bind(this, _rootExpressApp, port));
}

/**
 * To support both import ways:
 *   import exseed from 'exseed';
 *   import * as exseed from 'exseed';
 */
exports.default = module.exports;