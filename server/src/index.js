/* eslint-disable no-console  */
import { GraphQLServer } from 'graphql-yoga';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import constants from './config/constants';

import './config/database';

const options = {
  port: constants.PORT,
  endpoint: constants.ENDPOINT_URL,
  playground: constants.GRAPHQL_PLAYGROUND_URL,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req }),
});

server.start(options, () => console.log(`Server is running on PORT: ${options.port}  💃  🎉  👌`));
