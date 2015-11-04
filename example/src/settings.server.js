import waterlineSqlite3 from 'waterline-sqlite3';

export default {
  server: {
    port: {
      development: 3000,
      test: 4000,
      production: 5000,
    },
  },
  db: {
    development: {
      adapters: {
        sqlite3: waterlineSqlite3,
      },
      connections: {
        default: {
          adapter: 'sqlite3',
          type: 'disk',
          // base on cwd (current working directory)
          filename: './db.development.sqlite',
          debug: false, // show SQL queries or not
        },
      },
    },
    test: {
    },
    production: {
    },
  },
};