module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    debug: true,
    connection: {
      filename: './dev.sqlite3'
    },
    connection: {
      filename: './database/games.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

};
