import { GraphQLServer } from "graphql-yoga";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const options = {
  port: 8000,
  endpoint: "/graphql",
  playground: "/playground"
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(options, () =>
  console.log(`Server is running on PORT: ${options.port}`)
);
