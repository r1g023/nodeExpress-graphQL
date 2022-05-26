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
const { authors, books } = require("./authors-helpers");
// const authors = [
//   { id: 1, name: "J. K. Rowling" },
//   { id: 2, name: "J. R. R. Tolkien" },
//   { id: 3, name: "Brent Weeks" },
// ];

//author schema for autor list
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query to get list of authors",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors..",
      resolve: () => authors,
    },
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
  //adding mutations CRUD
  //   mutation: RootMutationType,
});

router.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
