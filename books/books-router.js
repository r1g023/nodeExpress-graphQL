const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const Books = require("./books-helpers");

//book schema for book list
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Get a list of books",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLInt },
  }),
});

//get list of books
const getBooks = {
  type: new GraphQLList(BookType),
  description: "list of books by author",
  resolve: (parent, args) => {
    return Books.getBooks();
  },
};

//get book by id
const getBookId = {
  type: BookType,
  description: "get book by id",
  args: { id: { type: GraphQLInt } },
  resolve: async (parent, args) => {
    let result = await Books.getBooksById(args.id);
    if (!result) throw new Error(`no id of ${args.id} found`);
    return result;
  },
};

//create a new book
const addBook = {
  type: BookType,
  description: "add a new book",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLInt },
  },
  resolve: (parent, args) => {
    return Books.addBook({
      name: args.name,
      author_id: args.author_id,
    });
  },
};

module.exports = { getBooks, getBookId, addBook };
