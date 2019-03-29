import chalk from 'chalk'
import {execSync as exec} from 'child_process'
import {textSync as text} from 'figlet'
import {basename} from 'path'
import Base, {Question} from 'yeoman-generator'

export interface BaseConfig {
  name: string
  description: string
  repo: string
  author: string
  keywords: string[]
  year: number
}

export default class BaseGenerator extends Base {
  subgenerator = '<BASE>'
  extraQuestions: Question[] = []

  /***
   * Tasks
   */

  initializing () {
    this.log('\n')
    this.log(text('react', {font: 'Big Money-nw'}))
    this.log(`\n\nWelcome to ${chalk.blue(`@bkonkle/react:${this.subgenerator}`)}!\n`)

    this.config.set('year', new Date().getFullYear())

    try {
      const origin = exec('git config --get remote.origin.url')
      if (origin.toString()) {
        this.config.set('repo', origin.toString().trim())
      }
    } catch (error) {
      // pass
    }

    try {
      const author = exec('git config --get user.name')
      const email = exec('git config --get user.email')
      if (author.toString() && email.toString()) {
        this.config.set(
          'author',
          `${author.toString().trim()} <${email.toString().trim()}>`
        )
      }
    } catch (error) {
      // pass
    }
  }

  async prompting () {
    const config = this.config.getAll() as BaseConfig

    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: basename(this.destinationRoot()),
        store: true,
      },
      {
        type: 'input',
        name: 'description',
        message: "The project's description:",
        store: true,
      },
      {
        type: 'input',
        name: 'repo',
        message: 'The repository url:',
        default: config.repo,
        store: true,
      },
      {
        type: 'input',
        name: 'author',
        message: "The project's author:",
        default: config.author,
        store: true,
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Comma-separated project keywords:',
        filter: keywords =>
          keywords ? keywords.split(',').map(keyword => keyword.trim()) : [],
        store: true,
      },
      ...this.extraQuestions,
    ])

    Object.keys(answers).forEach(key => {
      this.config.set(key, answers[key])
    })
  }

  writing () {
    // Copy over shared static files from the base generator
    this.fs.copy(this.templatePath('../../../src/base/static/**/*'), this.destinationRoot(), {
      globOptions: {dot: true},
    })

    // Copy over static files
    this.fs.copy(this.templatePath('../static/**/*'), this.destinationRoot(), {
      globOptions: {dot: true},
    })

    // Render templates
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      this.config.getAll(),
      {globOptions: {dot: true}}
    )

    // Move the dotfiles into place
    this.renameDotfiles(['gitignore', 'huskyrc', 'editorconfig'])
  }

  install () {
    this.yarnInstall()
  }

  /***
   * Utilities
   */

  /**
   * Move dotfiles into place
   */
  renameDotfiles (dotfiles: string[]) {
    for (const file of dotfiles) {
      this.fs.move(
        this.destinationPath(file),
        this.destinationPath(`.${file}`)
      )
    }
  }
}
