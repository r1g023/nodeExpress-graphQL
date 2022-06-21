const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: 1,
      email: "test1@email.com",
      username: "user1",
      password: bcrypt.hashSync("test1", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
    {
      id: 2,
      email: "test2@email.com",
      username: "user2",
      password: bcrypt.hashSync("test2", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
    {
      id: 3,
      email: "test3@email.com",
      username: "user3",
      password: bcrypt.hashSync("test3", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
  ]);
};
