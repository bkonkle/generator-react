import chalk from 'chalk'

import Server from './Server'

declare global {
  /**
   * Extend the Window object's type to support Redux devtools
   */
  interface NodeModule {
    hot: {
      accept (path?: string, callback?: () => void): void
    }
  }
}

async function run () {
  const replaceApp = await Server.main()

  if (module.hot) {
    module.hot.accept('./Server', async () => {
      console.log('🔁  HMR Reloading `./Server`...')

      // tslint:disable-next-line no-require-imports
      const newServer: typeof Server = require('./Server').default
      const app = await newServer.create()
      replaceApp(app)
    })

    console.info(chalk.green('✅  Server-side HMR Enabled!'))
  }
}

run().catch(error => { throw error })
