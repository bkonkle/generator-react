import BaseGenerator, {BaseConfig} from '../base/BaseGenerator'

export interface ApiConfig extends BaseConfig {}

export default class ApiGenerator extends BaseGenerator {
  writing () {
    BaseGenerator.prototype.writing.call(this)

    // Copy over shared static files from the api generator
    this.fs.copy(this.templatePath('../../../src/api/static/**/*'), this.destinationRoot(), {
      globOptions: {dot: true},
    })

    // // Render shared templates from the api generator
    // this.renderTemplates('../../../src/api/templates/**/*')
  }
}
