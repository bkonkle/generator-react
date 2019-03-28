import BaseGenerator, {BaseConfig} from '../../src/BaseReactGenerator'

export interface MobileConfig extends BaseConfig {}

export default class MobileGenerator extends BaseGenerator {
  subgenerator = 'mobile'

  initializing () {
    BaseGenerator.prototype.initializing.call(this)
  }

  async prompting () {
    return BaseGenerator.prototype.prompting.call(this)
  }

  writing () {
    BaseGenerator.prototype.writing.call(this)
  }

  install () {
    BaseGenerator.prototype.install.call(this)
  }
}
