// Update with your config settings.

module.exports = {

  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './dev.sqlite3'
    // }
    client: 'postgresql',
    connection: {
      database: 'potianuncios',
      user: 'postgres',
      password: 'pg123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
