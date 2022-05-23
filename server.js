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

//author schema for book list
const AuthorType = new GraphQLObjectType({
  name: "Authorz",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

//Books schema for books list
const BookType = new GraphQLObjectType({
  name: "Bookz",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        console.log("boooook------>", book);
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Queryz",
  description: "Root Query to get list of books",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors",
      resolve: () => authors,
    },
  }),
});

const schema = new GraphQLSchema({
  //getting of data
  query: RootQueryType,
});

server.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

let port = 5000;
server.listen(port, () =>
  console.log(`server is listening on port..... ${port}`)
);

//schema, pass into graphql function, so our expressGraphQl knows what our data will look like.
