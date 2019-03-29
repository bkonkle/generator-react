import express, {Express, Request} from 'express'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import playground from 'graphql-playground-middleware-express'
import noop from 'express-noop'
import {PostGraphileOptions, postgraphile} from 'postgraphile'
import {MiddlewareOptions as PlaygroundOptions} from 'graphql-playground-html'

import {Database, Server, Auth, Environment} from './Config'
import Plugins from './Plugins'

export async function create () {
  const app = express()

  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: Auth.jwksUri,
    }),
    audience: Auth.audience,
    issuer: Auth.issuer,
    algorithms: ['RS256'],
    credentialsRequired: !Environment.isDev,
  })

  const options: PostGraphileOptions = {
    appendPlugins: Plugins.plugins,
    // @ts-ignore - express vs plain http
    additionalGraphQLContextFromRequest: async (req: Request) => ({
      user: req.user,
    }),
    handleErrors: Plugins.handleErrors,
    // @ts-ignore - express vs plain http
    pgSettings: Plugins.pgSettings,
  }

  const playgroundOpts: PlaygroundOptions = {
    endpoint: '/graphql',
    settings: {
      // @ts-ignore - incomplete type
      'schema.polling.enable': false,
    },
  }

  app
    .disable('x-powered-by')
    .use(morgan(Environment.isDev ? 'dev' : 'combined'))
    .use(bodyParser.json())
    .use(jwtCheck)
    .get('/graphql', Environment.isDev ? playground(playgroundOpts) : noop())
    .use(postgraphile(Database.url, 'public', options))

  return app
}

export async function main () {
  let app = await create()

  const server = http.createServer(app)

  server.listen(Server.port, () => {
    // tslint:disable-next-line:no-console
    console.log(chalk.cyan(`> Started API on port ${chalk.yellow(Server.port.toString())}`))
  })

  function replaceApp (newApp: Express) {
    server.removeListener('request', app)
    server.on('request', newApp)
    app = newApp
  }

  return replaceApp
}

export default {create, main}
