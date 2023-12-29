const server = require("./api/server");
const expressPlayground =
  require("graphql-playground-middleware-express").default;

server.get("/playground", expressPlayground({ endpoint: "/graphql/auth/" }));


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running in port...${port}`);
});
