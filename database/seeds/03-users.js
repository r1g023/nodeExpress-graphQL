//impor faker
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    // add first_name, last_name and dob to users table
    {
      id: 1,
      first_name: "user1_name",
      last_name: "user1_last_name",
      dob: "2022-12-29",
      email: "test1@email.com",
      username: "user1",
      password: bcrypt.hashSync("test1", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
    {
      id: 2,
      first_name: "user2_name",
      last_name: "user2_last_name",
      dob: "2022-12-30",
      email: "test2@email.com",
      username: "user2",
      password: bcrypt.hashSync("test2", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
    {
      id: 3,
      first_name: "user3_name",
      last_name: "user3_last_name",
      dob: "2022-12-31",
      email: "test3@email.com",
      username: "user3",
      password: bcrypt.hashSync("test3", 10),
      role: "admin",
      avatar: faker.image.avatar(),
      dark_mode: false,
    },
  ]);
};
