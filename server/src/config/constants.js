const devConfig = {
  MONGO_URL: 'mongodb://localhost/yogademo-dev',
  JWT_SECRET: 'thisisascret',
  GRAPHQL_PLAYGROUND_URL: '/playground',
};
const testConfig = {
  MONGO_URL: 'mongodb://localhost/yogademo-test',
};
const prodConfig = {
  MONGO_URL: 'mongodb://localhost/yogademo-prod',
};
const defaultConfig = {
  PORT: process.env.PORT || 3000,
  ENDPOINT_URL: '/graphql',
};

const envConfig = (env) => {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
};

export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) };
