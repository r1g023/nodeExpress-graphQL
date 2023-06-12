require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile");

// seed test //
// production
const environment = "production";
module.exports = knex(config[environment]);
