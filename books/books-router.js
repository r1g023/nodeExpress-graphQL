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

//Root query type for books
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query list for books",
  fields: () => ({
    getBooks: {
      type: new GraphQLList(BookType),
      description: "list of books",
      resolve: (parent, args) => {
        return Books.getBooks();
      },
    },
  }),
});
