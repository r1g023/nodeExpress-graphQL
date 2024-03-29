const {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean,
} = require("graphql");

const Comments = require("./comments-helpers");
const Posts = require("../posts/posts-helpers");

// create comment type
const CommentType = new GraphQLObjectType({
  name: "Comments",
  description: "Get a list of comments",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    comment: { type: new GraphQLNonNull(GraphQLString) },
    liked: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
    user: { type: new GraphQLNonNull(GraphQLString) },
    post_id: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    comment_likes: {
      type: new GraphQLList(CommentType),
    },
  }),
});

// get comments from db
const getComments = {
  type: new GraphQLList(CommentType),
  description: "get list of comments",
  resolve: () => {
    return Comments.getComments();
  },
};

// get comment by Id from db
const getCommentId = {
  type: CommentType,
  description: "get comment by id",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: async (parent, args) => {
    let comment = await Comments.getCommentById(args.id);
    if (!comment)
      throw new Error(`Comment ID ${args.id} does not exist in the database`);
    return comment;
  },
};

// add new comments to the list
const addComment = {
  type: CommentType,
  description: "add a new comment",
  args: {
    id: { type: GraphQLInt },
    comment: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(GraphQLString) },
    post_id: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    console.log("args---->", args);
    let post = await Posts.getPosts();
    let result = post.find((post) => post.id === args.post_id);
    if (!result)
      throw new Error(`user ID: ${args.post_id} does not exist in users `);
    let comment = await Comments.addComment(args);
    return comment;
  },
};

// update a comment
const updateCommentID = {
  type: CommentType,
  description: "update a comment",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    comment: { type: GraphQLString },
    liked: { type: GraphQLBoolean },
    count: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    let commentArg = {
      comment: args.comment,
      liked: args.liked,
      count: args.count,
    };
    let comment = await Comments.updateCommentById(commentArg, args.id);
    if (!comment)
      throw new Error(`Comment ID ${args.id} does not exist in the database`);
    return comment;
  },
};

// delete a comment by its ID
const deleteCommentID = {
  type: CommentType,
  description: "delete a comment",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    let commentID = await Comments.getCommentById(args.id);
    if (!commentID)
      throw new Error(`Comment ID ${args.id} does not exist in the database`);

    return Comments.deleteCommentById(args.id);
  },
};

// get join comment_likes by user id
const getCommentLikes = {
  type: new GraphQLList(CommentType),
  description: "get list of comments",
  resolve: () => {
    return Comments.getCommentLikes();
  },
};

module.exports = {
  CommentType,
  getComments,
  getCommentId,
  addComment,
  updateCommentID,
  deleteCommentID,
  getCommentLikes,
};
