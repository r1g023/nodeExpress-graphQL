//import dbConfig
const db = require("../database/dbConfig");
module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
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

// update a comment
function updateComment(data, id) {
  return db("comments")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("comments").where({ id: id }).first();
    });
}

// delete a comment
function deleteComment(id) {
  return db("comments").where({ id }).del();
}
