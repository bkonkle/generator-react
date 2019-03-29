import ReactGenerator, {ReactConfig} from '../../src/react/ReactGenerator'

export interface WebConfig extends ReactConfig {}

export default class WebGenerator extends ReactGenerator {
  subgenerator = 'web'

  initializing () {
    ReactGenerator.prototype.initializing.call(this)
  }

  async prompting () {
    return ReactGenerator.prototype.prompting.call(this)
  }

  writing () {
    ReactGenerator.prototype.writing.call(this)

    // Move some extra dotfiles into place
    this.renameDotfiles(['dockerignore'])
  }

  install () {
    ReactGenerator.prototype.install.call(this)
  }
}
