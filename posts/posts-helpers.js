const db = require("../database/dbConfig");
module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
};

//get list of authors
function getPosts() {
  return db("posts").select("*").orderBy("id");
}

// add a new post to the database
async function addPost(data) {
  const [newPost] = await db("posts").insert(data, [
    "id",
    "title",
    "date",
    "image",
    "content",
    "method",
    "completed",
    "user_id",
  ]);
  return newPost;
}

//update a post by its Id
function updatePost(data, id) {
  return db("posts")
    .update(data)
    .where("id", id)
    .then((ids) => {
      return db("posts").where({ id: id }).first();
    });
}

// delete a post by its Id
function deletePost(id) {
  return db("posts").where({ id }).del();
}
