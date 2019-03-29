import ReactGenerator, {ReactConfig, ReactTarget} from '../../src/react/ReactGenerator'

export interface MobileConfig extends ReactConfig {}

export default class MobileGenerator extends ReactGenerator {
  subgenerator = 'mobile'
  target = ReactTarget.mobile

  initializing () {
    ReactGenerator.prototype.initializing.call(this)
  }

  async prompting () {
    return ReactGenerator.prototype.prompting.call(this)
  }

  writing () {
    ReactGenerator.prototype.writing.call(this)
  }

  install () {
    ReactGenerator.prototype.install.call(this)
  }
}
