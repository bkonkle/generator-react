import ApiGenerator, {ApiConfig} from '../../src/api/ApiGenerator'

export interface GraphQLConfig extends ApiConfig {}

export default class GraphQLGenerator extends ApiGenerator {
  subgenerator = 'graphql'

  initializing () {
    ApiGenerator.prototype.initializing.call(this)
  }

  async prompting () {
    return ApiGenerator.prototype.prompting.call(this)
  }

  writing () {
    ApiGenerator.prototype.writing.call(this)
  }

  install () {
    ApiGenerator.prototype.install.call(this)
  }
}
