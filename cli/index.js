#! /usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayUsage = displayUsage;
exports.run = run;

var _child_process = require('child_process');

function displayUsage() {
  console.log('\n    Usage: sd <command> [options]\n\n    Commands:\n      hello   say hello\n      help    display help message\n  ');
}

function run() {
  var userArgs = process.argv.slice(2);
  var command = userArgs[0];

  // no command
  if (command === undefined) {
    displayUsage();
  }
  // hello
  else if (command === 'hello') {
      console.log('hello world');
    }
    // help
    else if (command === 'help') {
        displayUsage();
      }
      // run
      else if (command === 'run') {
          var cmd = 'node ./build/debug/app.js';
          console.log('execute ' + cmd + '\n');
          var nodeApp = (0, _child_process.exec)(cmd);
          nodeApp.stdout.pipe(process.stdout);
          nodeApp.stderr.pipe(process.stdout);
        }
}

run();