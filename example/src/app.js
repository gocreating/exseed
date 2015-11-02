import * as exseed from 'exseed';
import http from 'http';

class App1 extends exseed.App {
  /**
   * Setup environments like logging requests, create server, etc.
   * @param {object} app - the express app instance
   */
  constructor(app) {
    super(app);
  }

  /**
   * Setup routing rules
   * @param {object} app - the express app instance
   * @param {object} router - the express router
   * @param {object} models - all models of the project
   */
  routing(app, router, models) {
    app.get('/app1', (req, res) => {
      res.send('app1');
    });
  }

  onError(err, req, res) {
    console.log('error handling of app 2');
  }
};

class App2 extends exseed.App {
  constructor(app) {
    super(app);
  }

  routing(app, router, models) {
    app.get('/app2_1', (req, res) => {
      res.send('app2_1');
    });

    this.expressApp.get('/app2_2', (req, res) => {
      res.send('app2_2');
    });
  }

  onError(err, req, res) {
    console.log('error handling of app 2');
  }
};

exseed.registerApp('app_1', App1);
exseed.registerApp('app_2', App2);
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