/**
 * Warning: Server-only module
 */
import {Request} from 'express'

import {Config} from './BrowserConfig'

interface CreateOptions {
  req?: Request,
}

export async function create (options: CreateOptions): Promise<Config> {
  const {req} = options
  const isDev = process.env.NODE_ENV === 'development'

  return {
    user: {
      ipAddress: req && (req.headers['x-forwarded-for'] || req.connection.remoteAddress),
      userAgent: req && (
        req.headers['user-agent'] ? req.headers['user-agent'] : navigator.userAgent
      ),
    },
    isDev,
<% if (useApollo) { %>    api: {
      endpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
    },
<% } %>  }
}

export default {create}
