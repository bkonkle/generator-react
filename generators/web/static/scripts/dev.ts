#!/usr/bin/env ts-node --transpile-only
// tslint:disable no-require-imports non-literal-require
import chalk from 'chalk'
import webpack from 'webpack'
import yargs from 'yargs'
import devServer, {Configuration} from 'webpack-dev-server'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware'

if (!process.env.NODE_ENV) {
  // Default the Node environment to 'development'
  process.env.NODE_ENV = 'development'
}

const args = yargs
  .usage('$0', 'start the render server in dev mode')
  .option('port', {
    alias: 'p',
    desc: 'port to listen on',
    type: 'string',
  })
  .argv

if (args.port) {
  process.env.PORT = args.port
}

export async function main () {
  console.log(chalk.green('Compiling...'))

  const configModule = await import('../webpack.config')
  const config = configModule.default

  const host = process.env.HOST || 'localhost'
  const port = process.env.PORT ? Number(process.env.PORT) : 4000

  const devServerConfig: Configuration = {
    noInfo: true,
    disableHostCheck: true,
    compress: true,
    host,
    port: port + 1,
    clientLogLevel: 'none',
    contentBase: './static',
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // Reportedly, this avoids CPU overload on some systems.
    watchOptions: {
      ignored: /node_modules/,
    },
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
    writeToDisk: true,
    // @ts-ignore - inaccurate types
    before (devApp, server) {
      // This lets us fetch source contents from webpack for the error overlay
      devApp.use(evalSourceMapMiddleware(server))
      // This lets us open files from the runtime error overlay.
      devApp.use(errorOverlayMiddleware())
    },
  }

  const compiler = webpack(config)

  // Create a new instance of webpack-dev-server that runs on port + 1 for client assets
  // @ts-ignore - bad type union
  const clientDevServer = new devServer(compiler, devServerConfig)

  const app = require(`${process.cwd()}/src/index`)

  // Start our server webpack instance in watch mode after assets compile
  compiler.hooks.done.tap('ServerPlugin', () => {
    app.main()
  })

  // Start webpack-dev-server
  clientDevServer.listen(
    port + 1,
    err => {
      if (err) {
        console.error(err)
      }
    }
  )
}

if (require.main === module) {
  main().catch(err => { throw err })
}
