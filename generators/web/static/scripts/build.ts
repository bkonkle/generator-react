#!/usr/bin/env ts-node --transpile-only
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import webpack, {Stats} from 'webpack'
import yargs from 'yargs'
import FileSizeReporter from 'react-dev-utils/FileSizeReporter'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'

yargs.usage('$0', 'build the client in production mode').argv

declare global {
  /**
   * Extend the Process object's type
   */
  namespace NodeJS {
    interface Process {
      noDeprecation?: boolean,
    }
  }
}

process.env.NODE_ENV = 'production'
process.noDeprecation = true

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// Wrap webpack compile in a promise
async function compile (config) {
  return new Promise<Stats>((resolve, reject) => {
    try {
      const compiler = webpack(config)

      compiler.run((err, statistics) => {
        if (err) {
          reject(err)
        } else {
          resolve(statistics)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

async function build () {
  const configModule = await import('../webpack.config')
  const config = configModule.default

  const stats = await compile(config)

  const messages = formatWebpackMessages(stats.toJson(true))
  if (messages.errors.length) {
    throw new Error(messages.errors.join('\n\n'))
  }

  console.log(chalk.blue('Client compiled successfully!'))

  return {stats, warnings: messages.warnings}
}

// Helper function to copy public directory to build/public
function copyStaticFolder () {
  fs.copySync(resolveApp('static'), resolveApp('build/public'), {dereference: true})
}

export async function main () {
  console.log(chalk.blue('Creating an optimized production client build...'))

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them, making the app more future-proof
  process.on('unhandledRejection', err => { throw err })

  const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
  const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  const previousFileSizes = await measureFileSizesBeforeBuild(resolveApp('build/public'))

  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  fs.emptyDirSync(resolveApp('build'))

  // Merge with the static folder
  copyStaticFolder()

  // Start the webpack build
  const {stats, warnings} = await build()

  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'))
    console.log(warnings.join('\n\n'))
    console.log(`
      '\nSearch for the '
        chalk.underline(chalk.yellow('keywords'))
        ' to learn more about each warning.'`
    )
  } else {
    console.log(chalk.green('Compiled successfully.\n'))
  }
  console.log('File sizes after gzip:\n')
  // @ts-ignore - inscrutable error about `import("ebpac").Stats` not matching `Stats`
  printFileSizesAfterBuild(stats, previousFileSizes, resolveApp('build'))
  console.log()
}

if (require.main === module) {
  main().catch(err => { throw err })
}
