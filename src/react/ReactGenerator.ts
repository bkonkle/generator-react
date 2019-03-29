import {Question} from 'yeoman-generator'

import BaseGenerator, {BaseConfig} from '../base/BaseGenerator'

export interface ReactConfig extends BaseConfig {
  apollo: boolean
}

export default class ReactGenerator extends BaseGenerator {
  extraQuestions: Question[] = [
    {
      type: 'confirm',
      name: 'apollo',
      message: 'Include react-apollo:',
      default: false,
      store: true,
    },
  ]

  writing () {
    BaseGenerator.prototype.writing.call(this)

    // Copy over shared static files from the react generator
    this.fs.copy(this.templatePath('../../../src/react/static/**/*'), this.destinationRoot(), {
      globOptions: {dot: true},
    })

    // Move some extra dotfiles into place
    this.renameDotfiles(['babelrc'])
  }
}
