require("dotenv").config();
const pg = require("pg");
var types = require("pg").types;
var moment = require("moment");

// parte the Date column into moment format and store it in the database
types.setTypeParser(1184, (str) => moment.utc(str).format("MM/DD/YYYY"));
types.setTypeParser(1082, (str) => moment.utc(str).format("MM/DD/YYYY"));
types.setTypeParser(1114, (str) => moment.utc(str).format("MM/DD/YYYY"));
types.setTypeParser(1083, (str) => moment.utc(str).format("MM/DD/YYYY"));
types.setTypeParser(1182, (str) => moment.utc(str).format("MM/DD/YYYY"));
types.setTypeParser(1266, (str) => moment.utc(str).format("MM/DD/YYYY"));

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}
// security reason are we going to reject people that are not authorized? No..
const sharedConfig = {
  client: "pg",
  migrations: { directory: "./database/migrations" },
  seeds: { directory: "./database/seeds" },
};

// connect to DB_CONNECTION_STRING

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },

  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  // railway database
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};

// const { Client } = require("pg");

// const client = new Client(process.env.DATABASE_URL);

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("SELECT NOW()");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();
