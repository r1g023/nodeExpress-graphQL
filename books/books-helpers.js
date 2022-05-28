const db = require("../database/dbConfig");
module.exports = {
  getBooks,
};

//get list of authors
function getBooks() {
  return db("books").select("*").orderBy("id");
}
