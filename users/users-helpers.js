const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getById,
  registerUser,
  loginUser,
};

function getUsers() {
  return db("users").orderBy("id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

//---------------------AUTH----------------------/
async function registerUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(user, [
    "id",
    "email",
    "username",
    "password",
    "role",
  ]);
  return newUserObject;
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH----------------------/
