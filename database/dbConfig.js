require("dotenv").config();
const knex = require("knex");
const config = require("../knexfile");

// add SSL

const environment = process.env.NODE_ENV || "renderdb";
module.exports = knex(config[environment]);
