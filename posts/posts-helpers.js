const db = require("../database/dbConfig");
module.exports = {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};

//get list of authors
function getPosts() {
  return db("posts").select("*").orderBy("id").reverse();
}

//get post by id from db
function getPostById(id) {
  return db("posts").where({ id }).first();
}

// add a new post to the database
async function addPost(data) {
  const [newPost] = await db("posts").insert(data, [
    "id",
    "title",
    "date",
    "image",
    "post",
    "liked",
    "user",
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
async function deletePost(id) {
  //return id and title after delete
  const [deletedPost] = await db("posts")
    .del(["id", "title", "user"])
    .where({ id });
  return deletedPost;
}
