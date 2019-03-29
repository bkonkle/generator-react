import dotenv from 'dotenv'
import parseDbUrl from 'parse-database-url'

dotenv.config()

export namespace Database {
  export const url = process.env.DATABASE_URL || 'postgres://<%= name %>-root@localhost:5432/<%= name %>'
  export const config = parseDbUrl(url)
  export const {database, user, name, username, password, hostname, host, port} = config
  export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0')
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10')
  export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export namespace Server {
  export const port = Number(process.env.PORT || '8000')
  export const bodyLimit = '100kb'
  export const corsHeaders = ['Link']
}

export namespace Knex {
  export const config = {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOSTNAME || Database.host,
      database: process.env.DATABASE_NAME || Database.database,
      user: process.env.DATABASE_USERNAME || Database.user,
      password: process.env.DATABASE_PASSWORD || Database.password,
      port: process.env.DATABASE_PORT || Database.port,
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
      idle: process.env.DATABASE_POOL_IDLE,
    },
    migrations: {
      tableName: 'KnexMigrations',
    },
  }
}

export namespace Auth {
  export const jwksUri = process.env.AUTH0_JWKS_URI
  export const audience = process.env.AUTH0_AUDIENCE
  export const issuer = process.env.AUTH0_ISSUER
}

export namespace Environment {
  export const isDev = process.env.NODE_ENV === 'development'
}

export default {Database, Server, Knex, Auth, Environment}
