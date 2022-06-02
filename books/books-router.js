const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const Books = require("./books-helpers");
const Authors = require("../authors/authors-helpers");

//book schema for book list
const BookType = new GraphQLObjectType({
  name: "Books",
  description: "Get a list of books",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve: async (book) => {
        let authors = await Authors.getAuthors();
        return authors.find((author) => author.id === book.author_id);
      },
    },
  }),
});

//author schema for author list, will export to authors router
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (author) => {
        let result = await Books.getBooks();
        return result.filter((book) => book.author_id === author.id);
      },
    },
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
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
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
    author_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (parent, args) => {
    return Books.addBook({
      name: args.name,
      author_id: args.author_id,
    });
  },
};

//update book by id
const updateBooks = {
  type: BookType,
  description: "update book by Id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (parent, args) => {
    return Books.updateBook(
      { name: args.name, author_id: args.author_id },
      args.id
    );
  },
};

//delete book by ID.
const deleteBook = {
  type: BookType,
  description: "delete a book",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: (parent, args) => {
    return Books.deleteBook(args.id);
  },
};

module.exports = {
  BookType,
  AuthorType,
  getBooks,
  getBookId,
  addBook,
  updateBooks,
  deleteBook,
};
