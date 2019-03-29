import {Question} from 'yeoman-generator'

import BaseGenerator, {BaseConfig} from '../base/BaseGenerator'

export interface ReactConfig extends BaseConfig {
  apollo: boolean
}

export enum ReactTarget {
  web = 'web',
  mobile = 'mobile',
}

export default class ReactGenerator extends BaseGenerator {
  extraQuestions: Question[] = [
    {
      type: 'confirm',
      name: 'useApollo',
      message: 'Include React Apollo:',
      default: false,
      store: true,
    },
  ]

  target: ReactTarget = ReactTarget.web

  async prompting () {
    await BaseGenerator.prototype.prompting.call(this)

    this.config.set('target', this.target)
  }

  writing () {
    BaseGenerator.prototype.writing.call(this)

    // Copy over shared static files from the react generator
    this.fs.copy(this.templatePath('../../../src/react/static/**/*'), this.destinationRoot(), {
      globOptions: {dot: true},
    })

    // // Render shared templates from the react generator
    // this.renderTemplates('../../../src/react/templates/**/*')

    // Move some extra dotfiles into place
    this.renameDotfiles(['babelrc'])

    if (this.config.get('useApollo')) {
      // Render shared templates from the react generator's apollo folder
      this.renderTemplates('../../../src/react/apollo/templates/**/*')
    }
  }
}
