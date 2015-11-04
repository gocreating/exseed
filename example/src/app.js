import * as exseed from 'exseed';
import BasicApp from './basic/index';
import UserApp from './user/index';
import Waterline from 'waterline';
import waterlineSqlite3 from 'waterline-sqlite3';
import http from 'http';

const config = {
  adapters: {
    'sqlite3': waterlineSqlite3
  },
  connections: {
    default: {
      adapter: 'sqlite3',
      type: 'disk',
      // base on cwd (current working directory)
      filename: './db.development.sqlite',
      debug: true, // show SQL queries or not
    },
  },
};

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
waterline.initialize(config, (err, ontology) => {
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
      console.dir(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

exseed.registerApp('basic', BasicApp);
exseed.registerApp('user', UserApp);
exseed.run(app => {
  const port = 3000;
  app.httpServer = http
    .createServer(app)
    .listen(port, () => {
      // @ifndef TEST
      console.log('HTTP server listening on port', port);
      // @endif
    });
});