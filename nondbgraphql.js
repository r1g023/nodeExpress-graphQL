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

//author schema for autor list
const AuthorType = new GraphQLObjectType({
  name: "Authorz",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
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
  description: "Root Query to get list of books and authors",
  fields: () => ({
    book: {
      type: BookType,
      description: "Single Book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors..",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "Single Author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

//mutation type
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add an author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name };
        authors.push(author);
        return author;
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

server.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

let port = 5000;
server.listen(port, () =>
  console.log(`server is listening on port..... ${port}`)
);

//schema, pass into graphql function, so our expressGraphQl knows what our data will look like.
