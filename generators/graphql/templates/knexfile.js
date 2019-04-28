require('ts-node/register/transpile-only')

const readFile = require('fs').readFileSync
const dotenv = require('dotenv')
const parseDbUrl = require('parse-database-url')

dotenv.config()

const dbUrl = process.env.DATABASE_URL || 'postgres://<%= name %>_root@localhost:5432/<%= name %>'

const dbConfig = parseDbUrl(dbUrl)

const ssl = Boolean(process.env.DATABASE_SSL) || Boolean(dbConfig.ssl)
const sslca = process.env.DATABASE_SSL_CA || dbConfig.sslca

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOSTNAME || dbConfig.host,
    database: process.env.DATABASE_NAME || dbConfig.database,
    user: process.env.DATABASE_USERNAME || dbConfig.user,
    password: process.env.DATABASE_PASSWORD || dbConfig.password,
    port: process.env.DATABASE_PORT || dbConfig.port,
    ssl: Boolean(ssl || sslca)
      ? sslca ? {ca: readFile(sslca)} : true
      : undefined,
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
