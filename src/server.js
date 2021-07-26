const app = require('./app');
require('dotenv/config');
// dotenv.config();
console.log(process.env.DATABASE)
app.listen(process.env.PORT || 3333);