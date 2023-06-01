require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile");

// add SSL
const environment = process.env.NODE_ENV || "development";
module.exports = knex(config[environment]);
