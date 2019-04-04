require('ts-node/register/transpile-only')

const parseDbUrl = require('parse-database-url')

const dbUrl = process.env.DATABASE_URL || 'postgres://<%= name %>_root@localhost:5432/<%= name %>'

const dbConfig = parseDbUrl(dbUrl)

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOSTNAME || dbConfig.host,
    database: process.env.DATABASE_NAME || dbConfig.database,
    user: process.env.DATABASE_USERNAME || dbConfig.user,
    password: process.env.DATABASE_PASSWORD || dbConfig.password,
    port: process.env.DATABASE_PORT || dbConfig.port,
  },
  pool: {
    min: process.env.DATABASE_POOL_MIN,
    max: process.env.DATABASE_POOL_MAX,
    idle: process.env.DATABASE_POOL_IDLE,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}
