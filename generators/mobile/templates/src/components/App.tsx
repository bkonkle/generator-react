import React, {Component} from 'react'
<% if (useApollo) {%>import {ApolloProvider} from 'react-apollo'
<% } %>import {Provider} from 'react-redux'

<% if (useApollo) { %>import ApiClient from '../data/ApiClient'
<% } %>import Routes from '../Routes'
import * as Store from '../state/Store'

const store = Store.create(Store.initialState)
<% if (useApollo) { %>const client = ApiClient.create()
<% } %>
export default class App extends Component {
  render () {
    return (
    <% if (useApollo) { %>  <ApolloProvider client={client}>
      <% } %>  <Provider store={store}>
    <% if (useApollo) { %>  <% } %>    <Routes />
    <% if (useApollo) { %>  <% } %>  </Provider>
    <% if (useApollo) { %>  </ApolloProvider>
    <% } %>)
  }
}
