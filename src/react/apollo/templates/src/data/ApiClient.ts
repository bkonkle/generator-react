import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
<% if (useAuth0) { %>import {setContext} from 'apollo-link-context'
<% } %>import {createHttpLink} from 'apollo-link-http'
import {createPersistedQueryLink} from 'apollo-link-persisted-queries'

<% if (useAuth0) { %>import {getAccessToken} from './AuthClient'
<% } %><% if (target === 'mobile') { %>import Config from '../Config'<% } else { %>import BrowserConfig from '../BrowserConfig'<% } %>

export type ApolloClient = ReturnType<typeof create>

export function createDummy () {
  const uri = <% if (target === 'mobile') { %>Config.Api.endpoint<% } else { %>BrowserConfig.get().api.endpoint<% } %>
  const httpLink = createHttpLink({uri})
  const cache = new InMemoryCache()

  return new ApolloClient({link: httpLink, cache})
}

export function create () {
  const uri = <% if (target === 'mobile') { %>Config.Api.endpoint<% } else { %>BrowserConfig.get().api.endpoint<% } %>
  const cache = new InMemoryCache()

  const httpLink = createPersistedQueryLink().concat(createHttpLink({uri}))

  <% if (useAuth0) { %>const authLink = setContext(async (_, {headers}) => {
    const token = await getAccessToken()
    const accessToken = token && token.accessToken
    const tokenType = token && token.tokenType

    return {
      headers: {
        ...headers,
        ...(accessToken ? {authorization: `${tokenType || 'Bearer'} ${accessToken}`} : {})
      }
    }
  })

  const link = authLink.concat(httpLink)
  <% } else { %>const link = httpLink
<% } %>
  return new ApolloClient({link, cache})
}

export default {create, createDummy}
