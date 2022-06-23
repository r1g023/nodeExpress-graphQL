const express = require("express");
const router = express.Router();
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const { registerUser, loginUser } = require("../auth/auth-router");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "register or login as user",
  fields: () => ({
    // <--------- Mutations for User ------->
    registerUser,
    loginUser,
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "please use mutations to either register or login as user",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "Please register or login on Mutations",
      },
    }),
  }),
  //adding mutations CRUD
  mutation: RootMutationType,
});

// router.use(restrictedUser(), checkRole());

router.use("/", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
