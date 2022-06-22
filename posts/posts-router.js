const {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType,
} = require("graphql");

const Posts = require("./posts-helpers");
const Comments = require("../comments/comments-helpers");
const { CommentType } = require("../comments/comments-router");

//post schema for post list
const PostType = new GraphQLObjectType({
  name: "Posts",
  description: "Get a list of posts",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    content: { type: new GraphQLNonNull(GraphQLString) },
    method: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
    user_id: { type: new GraphQLNonNull(GraphQLInt) },
    //list of comments for a post
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (post) => {
        let comments = await Comments.getComments();
        return comments.filter((comment) => comment.post_id === post.id);
      },
    },
  }),
});

// get posts from db
const getPosts = {
  type: new GraphQLList(PostType),
  description: "get list of posts",
  resolve: (parent, args) => {
    return Posts.getPosts();
  },
};

// get post by Id from db
const getPostId = {
  type: PostType,
  description: "get post by id",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: (parent, args) => {
    return Posts.getPostById(args.id);
  },
};

// create post
const createPost = {
  type: PostType,
  description: "create a new post",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    method: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
    user_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (parent, args) => {
    let newPost = {
      title: args.title,
      date: args.date,
      image: args.image,
      content: args.content,
      method: args.method,
      completed: args.completed,
      user_id: args.user_id,
    };
    return Posts.addPost(newPost);
  },
};

// update post by id
const updatePost = {
  type: PostType,
  description: "update post by id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    method: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  },
  resolve: async (parent, args) => {
    let postById = await Posts.getPostById(args.id);
    if (!postById) throw new Error(`no id of ${args.id} found`);
    return Posts.updatePost(
      { method: args.method, completed: args.completed },
      args.id
    );
  },
};

// delete post by id
const deletePost = {
  type: PostType,
  description: "delete post by id",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: (parent, args) => {
    return Posts.deletePost(args.id);
  },
};

//export modules for posts router
module.exports = {
  getPosts,
  getPostId,
  createPost,
  PostType,
  updatePost,
  deletePost,
};
