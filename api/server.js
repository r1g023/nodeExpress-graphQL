const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const { restrictedUser, checkRole } = require("../auth/auth-middleware");
//GLOBAL MIDDLEWARE
server.use(express.json());

//Import routers
const welcomeRouter = require("../welcome/welcome-router");
const graphql_api = require("./graphql_api");

//Server Endpoint --->
server.use("/", welcomeRouter);
server.use("/graphql", graphql_api);

// middleware for CATCH ERROR on all endpoints of /api/messages if REST only
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
