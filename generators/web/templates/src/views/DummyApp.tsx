import React, {Component} from 'react'
import {ApolloProvider} from 'react-apollo'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

<% if (useApollo) { %>import ApiClient, {ApolloClient} from '../data/ApiClient'
<% } %>import Store, {ReduxStore} from '../state/Store'

interface Props {}

interface State {
  store?: ReduxStore
<% if (useApollo) { %>  client?: ApolloClient
<% } %>}

export class DummyApp extends Component<Props, State> {
  state: State = {}

  async componentDidMount () {
    const store = Store.create(Store.initialState)
<% if (useApollo) { %>    const client = ApiClient.createDummy()
<% } %>
    this.setState({store<% if (useApollo) { %>, client<% } %>})
  }

  render () {
    const {children} = this.props
    const {store<% if (useApollo) { %>, client<% } %>} = this.state

    if (store<% if (useApollo) { %> && client<% } %>) {
      return (
      <% if (useApollo) { %>  <ApolloProvider client={client}>
        <% } %>  <Provider store={store}>
      <% if (useApollo) { %>  <% } %>    <BrowserRouter>
      <% if (useApollo) { %>  <% } %>      {children}
      <% if (useApollo) { %>  <% } %>    </BrowserRouter>
      <% if (useApollo) { %>  <% } %>  </Provider>
      <% if (useApollo) { %>  </ApolloProvider>
      <% } %>)
    }

    return null
  }
}

export default DummyApp
