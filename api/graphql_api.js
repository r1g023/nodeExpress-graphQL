const express = require("express");
const router = express.Router();
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { altairExpress } = require("altair-express-middleware");

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
const { getUsers, getUserById } = require("../users/users-router");
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
  updateComment,
  deleteComment,
} = require("../comments/comments-router");

//manipulate Authors, books, and users DB through root query
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
    // <--------- List of Posts ------>
    getPosts,
    getPostId,
    // <--------- List of Comments ------>
    getComments,
    getCommentId,
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
    updateComment,
    deleteComment,
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
  //adding mutations CRUD
  mutation: RootMutationType,
});

// router.use(restrictedUser(), checkRole());
router.use("/", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
