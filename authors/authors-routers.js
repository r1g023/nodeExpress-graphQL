const {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const Authors = require("./authors-helpers");
const { AuthorType } = require("../books/books-router");
const { restrictedUser, checkRole } = require("../auth/auth-middleware");

//get list of authors
const getAuthors = {
  type: new GraphQLList(AuthorType),
  description: "List of Authors..",
  args: {},
  resolve: (parent, args, { restrictedUser }) => {
    if (restrictedUser) return Authors.getAuthors();
  },
};

//get author by an ID
const getAuthorId = {
  type: AuthorType,
  description: "Get Author By ID",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: async (parent, args) => {
    let result = await Authors.getAuthorId(args.id);
    if (!result) throw new Error(`no id of ${args.id} found`);
    return result;
  },
};

//create a new Author
const createAuthor = {
  type: AuthorType,
  description: "create an Author",
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    console.log("args--->", args);
    return Authors.addAuthor({ name: args.name });
  },
};

//update author by id
const updateAuthorId = {
  type: AuthorType,
  description: "update an author by ID",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    let result = await Authors.getAuthorId(args.id);
    if (!result) throw new Error(`no id of ${args.id} found`);
    return Authors.updateAuthor({ name: args.name }, args.id);
  },
};

//delete an author
const deleteAuthor = {
  type: AuthorType,
  description: "delete a single author by its ID",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(parent, args) {
    let result = await Authors.getAuthorId(args.id);
    if (!result) throw new Error(`no id of ${args.id} found`);
    console.log("args delete--->", args);
    return Authors.deleteAuthor(args.id);
  },
};

module.exports = {
  getAuthors,
  getAuthorId,
  createAuthor,
  updateAuthorId,
  deleteAuthor,
};
