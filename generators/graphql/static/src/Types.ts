import GraphQL, {GraphQLResolveInfo} from 'graphql'
import {Client} from 'pg'
import SQL from 'pg-sql2'

declare global {
  namespace Express {
      export interface Request {
        // @ts-ignore - override the User type
        user?: User,
      }
  }
}

export interface User {
  iss: string,
  sub: string,
  aud: string[],
  iat: number,
  exp: number,
  azp: string,
  scope: string,
}

export interface GraphQLContext {
  pgClient: Client
  pgRole: string
  user: User
}

export interface GraphQLBuild {
  graphql: typeof GraphQL
  sql: typeof SQL
}

export interface GraphQLRequest {
  build: GraphQLBuild
  context: GraphQLContext
  resolveInfo: GraphQLResolveInfo
}
