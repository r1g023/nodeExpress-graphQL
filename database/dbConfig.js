require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile");

// seed test //
// production
const environment = process.env.NODE_ENV || "production";
module.exports = knex(config[environment]);
