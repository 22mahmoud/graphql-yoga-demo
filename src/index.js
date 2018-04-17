import { GraphQLServer } from "graphql-yoga";

import models from "./models";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import constants from "./config/constants";
import AuthService from "./services/Auth.service";

import "./config/database";

const options = {
  port: constants.PORT,
  endpoint: constants.ENDPOINT_URL,
  playground: constants.GRAPHQL_PLAYGROUND_URL
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req, models })
});

server.start(options, () =>
  console.log(`Server is running on PORT: ${options.port}  💃  🎉  👌`)
);
