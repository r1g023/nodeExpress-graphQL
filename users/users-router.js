const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const Users = require("./users-helpers");
const { generateToken } = require("../auth/auth-middleware");
const { PostType } = require("../posts/posts-router");
const Posts = require("../posts/posts-helpers");
const Comments = require("../comments/comments-helpers");
const { CommentType } = require("../comments/comments-router");

//book schema for book list
const UserType = new GraphQLObjectType({
  name: "Users",
  description: "Schema for registered users",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    token: {
      type: GraphQLString,
      description: "a token",
      resolve: async (parent, args) => {
        console.log("token parent---->", parent);
        return generateToken(parent);
      },
    },
    avatar: { type: GraphQLString },
    dark_mode: { type: GraphQLBoolean },
    about_you: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    // get posts by user from db
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user) => {
        let posts = await Posts.getPosts();
        return posts.filter((post) => post.user_id === user.id);
      },
      //return comments from db
      comments: {
        type: new GraphQLList(CommentType),
        resolve: async (user) => {
          let comments = await Comments.getComments();
          return comments.filter((comment) => comment.user_id === user.id);
        },
      },
    },
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

// get users by ID
const getUserById = {
  type: UserType,
  description: "get user by its ID",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: async (parent, args) => {
    let users = await Users.getById(args.id);
    if (!users) throw new Error(`user ID # ${args.id} does not exist`);
    return users;
  },
};

// update user by id
const updateUser = {
  type: UserType,
  description: "update user by id, optional fields can be updated",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    dob: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    avatar: { type: GraphQLString },
    dark_mode: { type: GraphQLBoolean },
    about_you: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    let userObj = {
      first_name: args.first_name,
      last_name: args.last_name,
      dob: args.dob,
      email: args.email,
      role: args.role,
      avatar: args.avatar,
      dark_mode: args.dark_mode,
      about_you: args.about_you,
    };
    let user = await Users.getById(args.id);
    if (!user) throw new Error(`user ID # ${args.id} does not exist`);
    //update the user
    return Users.updateUserID(userObj, args.id);
  },
};

// Delete User
const deleteUserID = {
  type: UserType,
  description: "delete user by id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    let user = await Users.getById(args.id);
    if (!user) throw new Error(`user ID # ${args.id} does not exist`);
    return Users.deleteUser(args.id);
  },
};

module.exports = { UserType, getUsers, getUserById, updateUser, deleteUserID };
