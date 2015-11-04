import { App } from 'exseed';

class UserApp extends App {
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

export default UserApp;