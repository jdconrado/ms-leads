import { Logger } from '@nestjs/common';

const APP_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  APP_URL: process.env.APP_URL || 'http://localhost',
  APP_PORT: parseInt(process.env.APP_PORT || '3000'),
  APP_PAGINATION_LIMIT: parseInt(process.env.APP_PAGINATION_LIMIT || '25'),

  // MONGODB
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://local_mongo_user:a3QwRjJ3c2V0@localhost:27017/ms-project?authSource=admin',
};

const logger = new Logger('AppVariables');

logger.log('NODE ENV:', APP_VARIABLES.NODE_ENV);
logger.log('LOG LEVEL:', APP_VARIABLES.LOG_LEVEL);

// Export the variables
export { APP_VARIABLES };
