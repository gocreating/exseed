// a map structure storing registered apps
let appMap = {};

export class App {

}

export function getApps() {
  return appMap;
}

export function registerApp(appName, appClass) {
  appMap[appName] = appClass;
}

export function run(cb) {
  cb();
}