//import dbConfig
const db = require("../database/dbConfig");
module.exports = {
  getComments,
  getCommentById,
  addComment,
  updateCommentById,
  deleteCommentById,
};

//get list of comments
function getComments() {
  return db("comments").select("*").orderBy("id");
}

// add a new comment
async function addComment(data) {
  const [newComment] = await db("comments").insert(data, [
    "id",
    "comment",
    "post_id",
  ]);
  return newComment;
}

// get comment by ID
function getCommentById(id) {
  return db("comments").where({ id }).first();
}

// update a comment
function updateCommentById(data, id) {
  return db("comments")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("comments").where({ id: id }).first();
    });
}

// delete a comment
function deleteCommentById(id) {
  return db("comments").where({ id }).del();
}
