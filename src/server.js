const app = require('./app');
const { logger } = require('./logger')
require('dotenv/config');

logger.info(`running on port: ${process.env.PORT}`);
app.listen(process.env.PORT || 3333);