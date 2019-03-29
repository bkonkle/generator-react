import {Constants} from 'expo'

const Config = {
  local: {
    Env: {
      isDev: true,
    },
<% if (useApollo) { %>
    Api: {
      endpoint: 'http://localhost:8000/graphql',
    },
<% } %>  },
  dev: {
    Env: {
      isDev: false,
    },
<% if (useApollo) { %>
    Api: {
      endpoint: 'http://localhost:8000/graphql',
    },
<% } %>  },
  beta: {
    Env: {
      isDev: false,
    },
<% if (useApollo) { %>
    Api: {
      endpoint: 'http://localhost:8000/graphql',
    },
<% } %>  },
  prod: {
    Env: {
      isDev: false,
    },
<% if (useApollo) { %>
    Api: {
      endpoint: 'http://localhost:8000/graphql',
    },
<% } %>  },
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
