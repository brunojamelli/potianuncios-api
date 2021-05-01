const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
app.listen(process.env.PORT || 3333);