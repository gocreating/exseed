#! /usr/bin/env node

import {exec} from 'child_process';

export function displayUsage() {
  console.log(`
    Usage: sd <command> [options]

    Commands:
      hello   say hello
      help    display help message
  `);
}

export function run() {
  const userArgs = process.argv.slice(2);
  const command = userArgs[0];

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
    const cmd = 'node ./build/debug/app.js';
    console.log(`execute ${cmd}\n`);
    let nodeApp = exec(cmd);
    nodeApp.stdout.pipe(process.stdout);
    nodeApp.stderr.pipe(process.stdout);
  }
}