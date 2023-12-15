const express = require("express");
const router = express.Router();
// const expressGraphQL = require("express-graphql").graphqlHTTP;

// var { graphqlHTTP } = require("express-graphql");
const { createHandler } = require("graphql-http/lib/use/express");

const { GraphQLSchema, GraphQLObjectType } = require("graphql");

//Authors database
const {
  getAuthors,
  getAuthorId,
  createAuthor,
  updateAuthorId,
  deleteAuthor,
  // getAuthorBooks,
} = require("../authors/authors-routers");

// Books database for
const {
  getBooks,
  getBookId,
  addBook,
  updateBooks,
  deleteBook,
} = require("../books/books-router");

// users database
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUserID,
  getCommentLikes,
} = require("../users/users-router");

// posts database
const {
  getPosts,
  getPostId,
  createPost,
  updatePost,
  deletePost,
} = require("../posts/posts-router");

// comments database
const {
  getComments,
  getCommentId,
  addComment,
  updateCommentID,
  deleteCommentID,
  // getCommentLikes,
} = require("../comments/comments-router");

//manipulate DB through root query
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query to get list of authors and books",
  //data coming from authors and books routers
  fields: () => ({
    // <--------- list of authors ----->
    getAuthors,
    getAuthorId,
    // <--------- List of books ------>
    getBooks,
    getBookId,
    // <--------- List of Users ------>
    getUsers,
    getUserById,
    getCommentLikes,
    // <--------- List of Posts ------>
    getPosts,
    getPostId,
    // <--------- List of Comments ------>
    getComments,
    getCommentId,
    // getCommentLikes,
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    // <--------- Mutation for Authors ------>
    createAuthor,
    updateAuthorId,
    deleteAuthor,
    // <--------- Mutations for Books ------->
    addBook,
    updateBooks,
    deleteBook,
    // <--------- Mutations for Posts ------->
    createPost,
    updatePost,
    deletePost,
    // <--------- Mutations for Comments ------->
    addComment,
    updateCommentID,
    deleteCommentID,
    // <--------- Mutations for Users ------->
    updateUser,
    deleteUserID,
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
  //adding mutations CRUD
  mutation: RootMutationType,
});

// router.use(restrictedUser(), checkRole());
router.use("/", createHandler({ schema: schema, graphiql: true }));

module.exports = router;
