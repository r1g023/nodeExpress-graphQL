require("dotenv").config();
const pg = require("pg");

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
