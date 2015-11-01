export function displayUsage() {
  console.log(`
    Usage: sd <command> [options]

    Commands:
      hello   say hello
      help    display help message
  `);
}

export function run() {
  let userArgs = process.argv.slice(2);
  let command = userArgs[0];

  if (command === undefined) {
    displayUsage();
  } else if (command === 'hello') {
    console.log('hello world');
  } else if (command === 'help') {
    displayUsage();
  }
}