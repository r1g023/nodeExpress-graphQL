const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: 1,
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
      role: "admin",
    },
    {
      id: 2,
      email: faker.internet.email(),
      username: faker.name.findName(),
      password: bcrypt.hashSync("test2", 10),
      role: "user",
    },
  ]);
};
