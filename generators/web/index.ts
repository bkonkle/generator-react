import {basename} from 'path'
import {execSync as exec} from 'child_process'
import {textSync as text} from 'figlet'
import Base from 'yeoman-generator'
import chalk from 'chalk'

export interface WebConfig {
  name: string
  description: string
  repo: string
  author: string
  keywords: string[]
  year: number
}

export default class WebGenerator extends Base {
  initializing () {
    this.log('\n')
    this.log(text('react', {font: 'Big Money-nw'}))
    this.log(`\n\nWelcome to ${chalk.blue('@bkonkle/react')}!\n`)

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
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: basename(this.destinationRoot()),
      },
      {
        type: 'input',
        name: 'description',
        message: "The project's description:",
      },
      {
        type: 'input',
        name: 'repo',
        message: 'The repository url:',
        default: this.config.get('repo'),
      },
      {
        type: 'input',
        name: 'author',
        message: "The project's author:",
        default: this.config.get('author'),
        store: true,
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Comma-separated project keywords:',
        filter: keywords =>
          keywords ? keywords.split(',').map(keyword => keyword.trim()) : [],
      },
    ])

    Object.keys(answers).forEach(key => {
      this.config.set(key, answers[key])
    })
  }

  writing () {
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
    const dotfiles = ['gitignore', 'huskyrc', 'editorconfig', 'dockerignore']

    for (const file of dotfiles) {
      this.fs.move(
        this.destinationPath(file),
        this.destinationPath(`.${file}`)
      )
    }
  }

  install () {
    this.yarnInstall()
  }
}
