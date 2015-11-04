import * as exseed from 'exseed';
import Waterline from 'waterline';
import http from 'http';
import settings from './settings.server';

const User = Waterline.Collection.extend({
  identity: 'user',
  connection: 'default',
  attributes: {
    firstName: 'string',
    lastName: 'string',
  },
});

const waterline = new Waterline();
waterline.loadCollection(User);
waterline.initialize(settings.db.development, (err, ontology) => {
  if (err) {
    return console.error(err);
  }

  // Tease out fully initialised models.
  const User = ontology.collections.user;

  User
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

exseed.init(settings);
exseed.registerApp('basic', require('./basic/').default);
exseed.registerApp('user', require('./user/').default);
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