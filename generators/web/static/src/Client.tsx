import React from 'react'
import ReactDOM from 'react-dom'

import Store from './state/Store'
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

async function main () {
  try {
    if (!window.__CONFIG__) {
      throw new Error('Unable to read the BrowserConfig')
    }

    BrowserConfig.fromJson(window.__CONFIG__)

    const store = Store.create(Store.initialState)

    ReactDOM.render(
      <App store={store} routes={Routes} />,
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

main().catch(err => { throw err })
