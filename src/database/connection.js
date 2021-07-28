const knex = require('knex');
const configuration = require('../../knexfile');

// const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;
const env = process.env.DB_ENV || 'development'
const connection = knex(configuration[env]);

module.exports = connection;