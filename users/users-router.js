const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  //boolean type
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
  fields: (req, res) => ({
    id: { type: GraphQLInt },
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    token: {
      type: GraphQLString,
      description: "a token",
      resolve: (parent, args) => {
        console.log("token parent---->", parent);
        return generateToken(parent);
      },
    },
    avatar: { type: GraphQLString },
    dark_mode: { type: GraphQLBoolean },
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

module.exports = { getUsers, getUserById, UserType };
