const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const { books, authors } = require("./graphQL-Resources");
//server
const server = express();

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLint) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: new GraphQLObjectType({
    name: "hello express",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "hello express.",
      },
    }),
  }),
});

server.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

let port = 5000;
server.listen(port, () =>
  console.log(`server is listening on port..... ${port}`)
);

//schema, pass into graphql function, so our expressGraphQl knows what our data will look like.
