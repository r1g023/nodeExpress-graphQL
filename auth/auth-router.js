const { GraphQLString, GraphQLNonNull, GraphQLBoolean } = require("graphql");
const bcrypt = require("bcryptjs");

const User = require("../users/users-helpers");
const { UserType } = require("../users/users-router");

//register as a new user
const registerUser = {
  type: UserType,
  description: "register as new user",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: GraphQLString },
    dark_mode: { type: GraphQLBoolean },
  },
  resolve: async (parent, args) => {
    const credentials = {
      email: args.email,
      username: args.username,
      password: bcrypt.hashSync(args.password, 10),
      role: args.role,
      avatar: args.avatar,
      dark_mode: args.dark_mode,
    };
    try {
      let newUser = await User.registerUser(credentials);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  },
};

//login as registered user and get the token
const loginUser = {
  type: UserType,
  description: "login as user",
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    console.log("args password----->", args.password);
    try {
      let user = await User.loginUser({ username: args.username });
      let valid = bcrypt.compareSync(args.password, user.password);
      if (!valid) throw new Error("check your password or username");

      if (user && bcrypt.compareSync(args.password, user.password)) {
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { registerUser, loginUser };
