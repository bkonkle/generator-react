#!/usr/bin/env ts-node --transpile-only
/* tslint:disable:no-require-imports */
/* tslint:disable:non-literal-require */
/* tslint:disable:no-implicit-dependencies */
import yargs from 'yargs'

process.env.NODE_ENV = 'production'
process.noDeprecation = true

// tslint:disable-next-line:no-unused-expression
yargs.usage('$0', 'start the render server in production mode').argv

export function main () {
  const app = require(`${process.cwd()}/src/index`)
  app.main()
}

if (require.main === module) {
  main()
}
