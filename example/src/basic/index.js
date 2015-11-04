import { App } from 'exseed';

class BasicApp extends App {
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
    app.get('/', (req, res) => {
      res.send('home');
    });

    app.get('/about', (req, res) => {
      res.send('about');
    });
  }

  onError(err, req, res) {
    console.log('error handling of app 2');
  }
};

export default BasicApp;