import express, {Express} from 'express'
import http from 'http'
import https from 'https'
import morgan from 'morgan'
import chalk from 'chalk'
import fs from 'fs'
import compression from 'compression'
import bodyParser from 'body-parser'
import noop from 'express-noop'

import BrowserConfig from './BrowserConfig'
import Config from './Config'

interface CreateOptions {
  staticPath: string
  buildPublicPath: string
  doc: Buffer
}

export function create (options: CreateOptions) {
  const {staticPath, buildPublicPath, doc} = options
  const isDev = process.env.NODE_ENV === 'development'

  const app = express()

  app
    .disable('x-powered-by')

    .use(compression())

    .use(morgan(isDev ? 'dev' : 'common'))

    .use(express.static(staticPath))

    .use(bodyParser.json())

    .use(isDev ? noop() : express.static(buildPublicPath))

    .get('/*', async (req, res) => {
      const preloadedDoc = doc
        .toString()
        .replace(
          '__CONFIG_CONTENT_MARKER__',
          BrowserConfig.toJson(await Config.create({req}))
        )

      res.send(preloadedDoc)
    })

  return app
}

export function run (options: CreateOptions) {
  let app = create(options)

  const server = http.createServer(app)
  const port = process.env.PORT ? Number(process.env.PORT) : 4000

  server.listen(port, () => {
    console.log(chalk.cyan(`> Started app on port ${chalk.yellow(port.toString())}`))
  })

  function replace (newApp: Express) {
    server.removeListener('request', app)
    server.on('request', newApp)
    app = newApp
  }

  return replace
}

export default {create, run}
