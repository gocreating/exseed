# Seed

A highly extensible nodejs framework.

## Features

- Highly Extensible
- Easy to Use
- Full Stack
- ORM Integrated
- ES6/ES7 Syntax
- Isomorphic

## Workflow & Implementation Details

| Item       | Choice |
|------------|--------|
| Editor     | [Sublime Text 3](http://www.sublimetext.com/3) |
| Build Tool | [Webpack](https://github.com/webpack/webpack) |
| Automation | [Gulp](https://github.com/gulpjs/gulp) |
| Backend    | [Node](https://nodejs.org/en/), [Express(>=4.0.0)](http://expressjs.com/) |
| ORM        | [Waterline](https://github.com/balderdashy/waterline) |
| Frontend   | [React](https://facebook.github.io/react/), [Redux](https://github.com/rackt/redux), [React-Router-Component](https://github.com/STRML/react-router-component) |
| Testing    | [Mocha](https://mochajs.org/) |
| CI         | [Travis CI](https://travis-ci.org/) |

## Example

These are just code snippets and outlines sketched in my mind, not a really working example

### File Structure

The file structure takes the advantage of `django`, which means there are several apps in a project and these apps will run in parallel

```
<project name>/
- node_modules/
----- seed/                     <!-- this is what we are going to work on -->
- gulp/                         <!-- gulp tasks and webpack configurations -->
- src/
----- app.js                    <!-- project entry -->
----- <app name 1>/
--------- index.js              <!-- backend app entry -->
--------- flux/
------------- views/
------------- actions/
------------- stores/
------------- boot.js           <!-- frontend app entry -->
--------- models/               <!-- ORM schemas -->
--------- routes/               <!-- actions -->
--------- public/               <!-- static files like styles and images -->
----- <app name 2>/
--------- same as above
----- ...
----- <app name n>/
--------- same as above
- build/                        <!-- codes build from src -->
----- debug/
----- test/
----- release/
- gulpfile.js
- package.json
```

### Code Snippets

#### app.js

```
import seed from 'seed';

seed.registerApp('basic', require('./basic'));
seed.registerApp('user', require('./user'));
seed.registerApp('todo', require('./todo'));
seed.run((app) => {
  app.listen(...);
});
```

#### <some app>/index.js

```
import seed from 'seed';

export default class ExampleApp extends seed.App {
  constructor(app) {
  }

  /**
   * Setup environments like logging requests, create server, etc.
   * @param {object} app - the express app instance
   */
  setup(app) {
    // dealing with middlewares
    app.use(tokenParser);
    app.use(someMiddleware);

    // register models
    seed.registerModel(model_1);
    seed.registerModel(model_2);
  }

  /**
   * Setup routing rules
   * @param {object} app - the express app instance
   * @param {object} router - the express router
   * @param {object} models - all models of the project
   */
  routing(app, router, models) {
    // general routing
    router.get('/example/:param', require('some_controller').some_action);

    // api routing with resources

    // Policy 1 - mount helper function `resource` onto app
    app.resource(new seed.Resource('api'));
    app.resource(new UserResources({
      prefix: 'api',
      name: 'users',
    }));
    app.resource(new ImageResources('images'));
    app.resource(new seed.Resources({
      prefix: 'api',
      name: 'todos',
    }));

    // Policy 2 - integrate with express router
    const apiRouter = express.router();
    apiRouter.use('', new UserResources('users').router());
    apiRouter.use('', new ImageResources('images').router());
    apiRouter.use('', new seed.Resources('todos').router());
    router.use('/api', apiRouter);

    // Policy 3 - resource tree
    app.resource(
      new seed.ResourceTree({
        prefix: 'api',
        resources: [
          new seed.ResourceTree({
            name: 'users',
            resources: [
              new seed.ResourceTree({
                name: 'images',
              }),
            ],
          }),
          new seed.ResourceTree({
            name: 'todos',
          }),
        ],
      })
    );
  }
  
  onError(err, req, res) {
    switch (err) {
      case 'PageNotFound':
      case 'Unauthorize':
      case ...
    }
  }
};
```

#### Resources

The `rails` like resource

```
// UserResource.js
import seed from 'seed';
import {loginRequired, permissionRequired} from 'seed';
const {UserModel} = seed.getModels();

export default class UserResource extends seed.Resources {
  constructor(resourcesName, idFormat) {
    super(resourcesName, idFormat);
  }

  // override the restful `create` method
  create(req, res) {
    UserModel.register(...);
  }

  // override the restful `delete` method
  @loginRequired
  @permissionRequired('ALLOW_DELETE_USER')
  delete(req, res) {
    UserModel
      .findById(req.params.id)
      .rmeove((err, deletedUser) => {
        res.jsonp(deletedUser);
      });
  }
};
```