const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const Users = require("./users-helpers");

//book schema for book list
const UserType = new GraphQLObjectType({
  name: "Users",
  description: "Schema for registered users",
  fields: () => ({
    id: { type: GraphQLInt },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

//get users from db
const getUsers = {
  type: new GraphQLList(UserType),
  description: "get list of registered users.. ",
  resolve: (parent, args) => {
    return Users.getUsers();
  },
};

//const get users by ID
const getUserById = {
  type: UserType,
  description: "get user by its ID",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: async (parent, args) => {
    let users = await Users.getById(args.id);
    if (!users) throw new Error(`cant find user by id of ${args.id}`);
    return users;
  },
};

module.exports = { getUsers, getUserById };
