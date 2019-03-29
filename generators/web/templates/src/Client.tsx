import React from 'react'
import ReactDOM from 'react-dom'

<% if (useApollo) { %>import ApiClient from './data/ApiClient'
<% } %>import Store from './state/Store'
import App from './views/App'
import DummyApp from './views/DummyApp'
import ErrorPage from './views/ErrorPage'

import BrowserConfig from './BrowserConfig'
import Routes from './Routes'

declare global {
  interface Window {
    __CONFIG__?: string,
  }
}

function main () {
  try {
    if (!window.__CONFIG__) {
      throw new Error('Unable to read the BrowserConfig')
    }

    BrowserConfig.fromJson(window.__CONFIG__)

    const store = Store.create(Store.initialState)
<% if (useApollo) { %>    const client = ApiClient.create()
<% } %>    ReactDOM.render(
      <App store={store} <% if (useApollo) { %>client={client} <% }%>routes={Routes} />,
      document.getElementById('root')
    )
  } catch (error) {
    console.error(error)

    ReactDOM.render(
      <DummyApp><ErrorPage /></DummyApp>,
      document.getElementById('root')
    )
  }
}

main()
