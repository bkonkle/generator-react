#!/usr/bin/env ts-node --transpile-only
// tslint:disable no-require-imports non-literal-require
import yargs from 'yargs'

process.env.NODE_ENV = 'production'
process.noDeprecation = true

yargs.usage('$0', 'start the render server in production mode').argv

export function main () {
  const app = require(`${process.cwd()}/src/index`)
  app.main()
}

if (require.main === module) {
  main()
}
