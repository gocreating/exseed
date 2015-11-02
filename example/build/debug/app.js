'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _exseed = require('exseed');

var exseed = _interopRequireWildcard(_exseed);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App1 = (function (_exseed$App) {
  _inherits(App1, _exseed$App);

  /**
   * Setup environments like logging requests, create server, etc.
   * @param {object} app - the express app instance
   */

  function App1(app) {
    _classCallCheck(this, App1);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App1).call(this, app));
  }

  /**
   * Setup routing rules
   * @param {object} app - the express app instance
   * @param {object} router - the express router
   * @param {object} models - all models of the project
   */

  _createClass(App1, [{
    key: 'routing',
    value: function routing(app, router, models) {
      app.get('/app1', function (req, res) {
        res.send('app1');
      });
    }
  }, {
    key: 'onError',
    value: function onError(err, req, res) {
      console.log('error handling of app 2');
    }
  }]);

  return App1;
})(exseed.App);

;

var App2 = (function (_exseed$App2) {
  _inherits(App2, _exseed$App2);

  function App2(app) {
    _classCallCheck(this, App2);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App2).call(this, app));
  }

  _createClass(App2, [{
    key: 'routing',
    value: function routing(app, router, models) {
      app.get('/app2_1', function (req, res) {
        res.send('app2_1');
      });

      this.expressApp.get('/app2_2', function (req, res) {
        res.send('app2_2');
      });
    }
  }, {
    key: 'onError',
    value: function onError(err, req, res) {
      console.log('error handling of app 2');
    }
  }]);

  return App2;
})(exseed.App);

;

exseed.registerApp('app_1', App1);
exseed.registerApp('app_2', App2);
exseed.run(function (app) {
  var port = 3000;
  app.httpServer = _http2.default.createServer(app).listen(port, function () {
    // @ifndef TEST
    console.log('HTTP server listening on port', port);
    // @endif
  });
});