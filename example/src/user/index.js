import {
  App,
  registerModel,
  env
} from 'exseed';

class UserApp extends App {
  constructor(app) {
    super(app);
    registerModel(require('./models/user').default);
  }

  init(models) {
    // insert data in development env
    if (env.development) {
      models.user
        .create({
          email: 'test@test.test',
          name: 'test',
          password: 'test',
        })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => {
          console.error(err);
        });
    }
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