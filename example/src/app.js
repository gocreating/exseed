import * as exseed from 'exseed';
import settings from './settings.server';

exseed.registerApp('basic', require('./basic/').default);
exseed.registerApp('user', require('./user/').default);

exseed.init(settings, (err, models) => {
  if (err) {
    throw err;
  }
  exseed.run((app, port) => {
    console.log(`HTTP server listening on port ${port}`);
  });
});