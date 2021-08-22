const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const { errors } = require('celebrate');
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
