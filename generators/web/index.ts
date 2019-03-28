import BaseGenerator, {BaseConfig} from '../../src/BaseReactGenerator'

export interface WebConfig extends BaseConfig {}

export default class WebGenerator extends BaseGenerator {
  subgenerator = 'web'

  initializing () {
    BaseGenerator.prototype.initializing.call(this)
  }

  async prompting () {
    return BaseGenerator.prototype.prompting.call(this)
  }

  writing () {
    BaseGenerator.prototype.writing.call(this)

    // Move some extra dotfiles into place
    this.renameDotfiles(['dockerignore'])
  }

  install () {
    BaseGenerator.prototype.install.call(this)
  }
}
