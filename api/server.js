const express = require("express");

const server = express();
const ws = require("express-ws")(server);
const cors = require("cors");
const { restrictedUser, checkRole } = require("../auth/auth-middleware");
// GLOBAL MIDDLEWARE
server.use(express.json(), cors());

// Import routers
const welcomeRouter = require("../welcome/welcome-router");
const graphql_api = require("./graphql_api");
const graphql_auth = require("./graphql_auth");

// Server Endpoint ----->
server.use("/", welcomeRouter);
server.use("/graphql/auth", graphql_auth);
server.use("/graphql", restrictedUser(), graphql_api);

// middleware for CATCH ERROR
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
