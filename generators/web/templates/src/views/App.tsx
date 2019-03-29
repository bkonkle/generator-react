import React, {SFC} from 'react'
<% if (useApollo) {%>import {ApolloProvider} from 'react-apollo'
<% } %>import {Provider} from 'react-redux'
import {RouteProps} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

<% if (useApollo) { %>import {ApolloClient} from '../data/ApiClient'
<% } %>import {ReduxStore} from '../state/Store'
import Router, {OnInit} from './Router'

export interface AppProps {
  store: ReduxStore,
  <% if (useApollo) { %>client: ApolloClient,
  <% } %>routes: RouteProps[],
  onInit?: OnInit,
}

const App: SFC<AppProps> = ({store,<% if (useApollo) { %> client,<% } %> routes, onInit}) => (
<% if (useApollo) { %>  <ApolloProvider client={client}>
  <% } %>  <Provider store={store}>
<% if (useApollo) { %>  <% } %>    <BrowserRouter>
<% if (useApollo) { %>  <% } %>      <Router routes={routes} onInit={onInit} />
<% if (useApollo) { %>  <% } %>    </BrowserRouter>
<% if (useApollo) { %>  <% } %>  </Provider>
<% if (useApollo) { %>  </ApolloProvider>
<% } %>)

if (module.hot) {
  module.hot.accept()
}

export default App
