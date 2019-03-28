import {Constants} from 'expo'

const Config = {
  local: {
    Env: {
      isDev: true,
    },
  },
  dev: {
    Env: {
      isDev: false,
    },
  },
  beta: {
    Env: {
      isDev: false,
    },
  },
  prod: {
    Env: {
      isDev: false,
    },
  },
}

function getConfig () {
  switch (Constants.manifest.releaseChannel) {
    case 'dev':
      return Config.dev
    case 'beta':
      return Config.beta
    case 'prod':
      return Config.prod
    default:
      return Config.local
  }
}

export default getConfig()
