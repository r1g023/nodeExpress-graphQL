require("dotenv").config();
const pg = require("pg");
var types = require("pg").types;
var moment = require("moment"); // require

types.setTypeParser(1184, (str) =>
  moment(str).format("MMMM Do YYYY, h:mm:ss a")
);
// parte the Date column into moment format and store it in the database
types.setTypeParser(1082, (str) =>
  moment(str).format("MMMM Do YYYY, h:mm:ss a")
);

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}
// security reason are we going to reject people that are not authorized? No..
const sharedConfig = {
  client: "pg",
  migrations: { directory: "./database/migrations" },
  seeds: { directory: "./database/seeds" },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};
