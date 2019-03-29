import chalk from 'chalk'
import dotenv from 'dotenv'
import {Express} from 'express'
import fs from 'fs'

import Server from './Server'

dotenv.config()

let replaceApp: (newApp: Express) => void

export function main () {
  const staticPath = `${__dirname}/../static`
  const buildPublicPath = `${__dirname}/../build/public`
  const doc = fs.readFileSync(`${buildPublicPath}/document.html`)

  if (replaceApp) {
    console.log(chalk.green('🔁 Reloading Server...'))

    // tslint:disable-next-line no-require-imports
    const NewServer: typeof Server = require('./Server').default
    const app = NewServer.create({staticPath, buildPublicPath, doc})

    replaceApp(app)
  } else {
    replaceApp = Server.run({staticPath, buildPublicPath, doc})
  }
}

if (require.main === module) {
  main()
}
