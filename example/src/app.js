import * as exseed from 'exseed';
import http from 'http';
import settings from './settings.server';

const User = {
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',
  },
};

exseed.registerApp('basic', require('./basic/').default);
exseed.registerApp('user', require('./user/').default);

exseed.registerModel(User);

exseed.init(settings, (err, models) => {
  if (err) {
    throw err;
  }
  models.user
    .create({
      firstName: 'Neil',
      lastName: 'Armstrong',
    })
    .then((user) => {
      console.log(user.toObject());
    })
    .catch((err) => {
      console.error(err);
    });
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