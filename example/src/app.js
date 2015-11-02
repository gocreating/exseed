import * as exseed from 'exseed';

exseed.registerApp('app a', 'app 1');
exseed.registerApp('app b', 'app 2');
exseed.registerApp('app c', 'app 3');

console.log(exseed.getApps());