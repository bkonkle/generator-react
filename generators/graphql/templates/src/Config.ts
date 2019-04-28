import dotenv from 'dotenv'

dotenv.config()

export namespace Database {
  export const url = process.env.DATABASE_URL || 'postgres://<%= name %>_root@localhost:5432/<%= name %>'
}

export namespace Server {
  export const port = Number(process.env.PORT || '8000')
  export const bodyLimit = '100kb'
  export const corsHeaders = ['Link']
}

export namespace Auth {
  export const jwksUri = process.env.AUTH_JWKS_URI
  export const audience = process.env.AUTH_AUDIENCE
  export const issuer = process.env.AUTH_ISSUER
}

export namespace Environment {
  export const isDev = process.env.NODE_ENV === 'development'
}

export default {Database, Server, Auth, Environment}
