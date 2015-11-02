'use strict';

var _exseed = require('exseed');

var exseed = _interopRequireWildcard(_exseed);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exseed.registerApp('app a', 'app 1');
exseed.registerApp('app b', 'app 2');
exseed.registerApp('app c', 'app 3');

console.log(exseed.getApps());