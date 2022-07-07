const db = require("../database/dbConfig");

module.exports = {
  getUsers,
  getById,
  registerUser,
  loginUser,
  updateUserID,
  deleteUser,
};

// get list of users from db
function getUsers() {
  return db("users").orderBy("id");
}

// get user by id
function getById(id) {
  return db("users").where({ id }).first();
}

// update user by id
function updateUserID(data, id) {
  return db("users")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("users").where({ id: id }).first();
    });
}

// delete user by id
async function deleteUser(id) {
  const [user] = await db("users")
    .del(["id", "email", "username"])
    .where({ id });
  return user;
}

//---------------------AUTH----------------------/
async function registerUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(user, [
    "id",
    "first_name",
    "last_name",
    "dob",
    "email",
    "username",
    "password",
    "role",
    "avatar",
    "dark_mode",
    "about_you",
  ]);
  return newUserObject;
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH----------------------/
