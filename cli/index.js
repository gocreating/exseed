'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayUsage = displayUsage;
exports.run = run;
function displayUsage() {
  console.log('\n    Usage: seed <command> [options]\n\n    Commands:\n      hello   say hello\n      help    display help message\n  ');
}

function run() {
  var userArgs = process.argv.slice(2);
  var command = userArgs[0];

  if (command === undefined) {
    displayUsage();
  } else if (command === 'hello') {
    console.log('hello world');
  } else if (command === 'help') {
    displayUsage();
  }
}