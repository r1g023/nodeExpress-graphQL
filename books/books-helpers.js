const db = require("../database/dbConfig");
module.exports = {
  getBooks,
  getBooksById,
  addBook,
  updateBook,
  deleteBook,
};

//get list of authors
function getBooks() {
  return db("books").select("*").orderBy("id");
}

//get list of authors by id
function getBooksById(id) {
  return db("books").where({ id }).first();
}

// add a new book
async function addBook(data) {
  // THIS METHOD IS USEFUL WHEN USING POSTGRES
  const [newPost] = await db("books").insert(data, ["id", "name", "author_id"]);
  return newPost;
}

// update book by id
function updateBook(data, id) {
  return db("books")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("books").where({ id: id }).first();
    });
}

//delete book by ID
function deleteBook(id) {
  return db("books").where({ id }).del();
}
