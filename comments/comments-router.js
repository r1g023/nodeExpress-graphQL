const {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");

const Comments = require("./comments-helpers");

// create comment type
const CommentType = new GraphQLObjectType({
  name: "Comments",
  description: "Get a list of comments",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    comment: { type: GraphQLString },
    post_id: { type: GraphQLInt },
  }),
});

// get comments from db
const getComments = {
  type: new GraphQLList(CommentType),
  description: "get list of comments",
  resolve: (parent, args) => {
    return Comments.getComments();
  },
};

// get comment by Id from db
const getCommentId = {
  type: CommentType,
  description: "get comment by id",
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  resolve: (parent, args) => {
    return Comments.getCommentById(args.id);
  },
};

// add new comments to the list
const addComment = {
  type: CommentType,
  description: "add a new comment",
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    post_id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: (parent, args) => {
    return Comments.addComment(args);
  },
};

// update comment by Id
const updateComment = {
  type: CommentType,
  description: "update comment by id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    comment: { type: GraphQLString },
    post_id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    //get comments by id async
    // let comment = await Comments.getCommentById(args.id);
    // if (!comment) throw new Error(`no id of ${args.id} found`);
    return Comments.updateComment(
      { comments: args.comment, post_id: args.post_id },
      args.id
    );
  },
};

// delete comment by Id
const deleteComment = {
  type: CommentType,
  description: "delete comment by id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    //get comments by id async
    // let comment = await Comments.getCommentById(args.id);
    // if (!comment) throw new Error(`no id of ${args.id} found`);
    return Comments.deleteComment(args.id);
  },
};

module.exports = {
  CommentType,
  getComments,
  getCommentId,
  addComment,
  updateComment,
  deleteComment,
};
