/* eslint-disable no-console */
import mongoose from 'mongoose';

import constants from './constants';

try {
  mongoose.connect(constants.MONGO_URL);
} catch (error) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.set('debug', true);
mongoose.connection
  .once('open', () => console.log('MongoDB Running 🏃‍ 🏃‍'))
  .on('error', (error) => {
    throw error;
  });
