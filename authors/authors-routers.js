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
const Authors = require("./authors-helpers");

//author schema for author list
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

//manipulate Authors DB through root query
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query to get list of authors",
  fields: () => ({
    getAuthors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors..",
      resolve: (parent, args) => {
        return Authors.getAuthors();
      },
    },
    getAuthorId: {
      type: AuthorType,
      description: "GET BY ID",
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        return Authors.getAuthorId(args.id);
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        console.log("args--->", args);
        return Authors.addAuthor({ name: args.name });
      },
    },
    //UPDATE THE AUTHOR
    updateAuthorId: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let result = await Authors.getAuthorId(args.id);
        if (!result) throw new Error(`no id of ${args.id} found`);
        return Authors.updateAuthor({ name: args.name }, args.id);
      },
    },
    //DELETE author
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        let result = await Authors.getAuthorId(args.id);
        if (!result) throw new Error(`no id of ${args.id} found`);
        console.log("args delete--->", args);
        return Authors.deleteAuthor(args.id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
  //adding mutations CRUD
  mutation: RootMutationType,
});

router.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
