import {} from "graphql-yoga";

const typedefs = `
    type Query {
        description: String
    }
`;

const resolvers = {
  Query: {
    description: () => "this is the API for simple blogging application"
  }
};
