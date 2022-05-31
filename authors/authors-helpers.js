const db = require("../database/dbConfig");
module.exports = {
  getAuthors,
  getAuthorId,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorBooks,
};

//get list of authors
function getAuthors(authorId) {
  return db("authors").select("*").orderBy("id");
}

//get author by id
function getAuthorId(id) {
  return db("authors").where({ id }).first();
}

//post new author
async function addAuthor(data) {
  // THIS METHOD IS USEFUL WHEN USING POSTGRES
  const [newPost] = await db("authors").insert(data, ["id", "name"]);
  return newPost;
  //   return db("authors").insert(data, "id") //.returning(id).then()
  //   .then((ids) => {
  //     console.log("ids in post--->", ids);
  //     return db("authors").where({ id: ids }).limit(1);
  //   });
}

//update author by id
async function updateAuthor(data, id) {
  return db("authors")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("authors").where({ id: id }).first();
    });
}

//delete an author
function deleteAuthor(id) {
  return db("authors").where({ id }).del();
}

//get all books for each author
function getAuthorBooks() {
  return db("authors")
    .join("books", "authors.id", "=", "books.author_id")
    .select("books.id", "books.name", "authors.name as author");
}
