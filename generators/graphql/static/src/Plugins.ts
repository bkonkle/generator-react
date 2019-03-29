import {Request} from 'express'
import Debug from 'debug'
import {GraphQLError, formatError} from 'graphql'
import {GraphQLErrorExtended} from 'postgraphile'

import {Environment} from './Config'

const debug = Debug('allay-api:Plugins')

export async function pgSettings (req: Request) {
  const sub = req.user && req.user.sub

  return {
    'jwt.claims.sub': sub,
    role: 'allay_user',
  }
}

export const plugins = []

export const handleErrors = (errors: GraphQLError[]) => errors.map((error: GraphQLError) => {
  const formattedError = formatError(error) as GraphQLErrorExtended

  // If this is dev, add the stack to the formatted error.
  if (Environment.isDev) {
    debug(error)

    // @ts-ignore - dev-only
    formattedError.stack = error.stack
  }

  return formattedError
})

export default {
  pgSettings,
  plugins,
  handleErrors,
}
