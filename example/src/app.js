import * as exseed from 'exseed';
import http from 'http';
import settings from './settings.server';

exseed.registerApp('basic', require('./basic/').default);
exseed.registerApp('user', require('./user/').default);

exseed.init(settings, (err, models) => {
  if (err) {
    throw err;
  }
});

exseed.run(app => {
  const port = settings.server.port.development;
  app.httpServer = http
    .createServer(app)
    .listen(port, () => {
      // @ifndef TEST
      console.log('HTTP server listening on port', port);
      // @endif
    });
});