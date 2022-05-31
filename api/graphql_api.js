const express = require("express");
const router = express.Router();
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
//Authors database
const {
  getAuthors,
  getAuthorId,
  createAuthor,
  updateAuthorId,
  deleteAuthor,
} = require("../authors/authors-routers");
// Books database for
const { getBooks, getBookId, addBook } = require("../books/books-router");

//manipulate Authors and books DB through root query
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
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
  //adding mutations CRUD
  mutation: RootMutationType,
});

router.use("/", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
