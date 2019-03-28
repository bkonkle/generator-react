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
  }
}

export default {create}
