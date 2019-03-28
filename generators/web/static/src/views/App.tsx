import React, {SFC} from 'react'
import {Provider} from 'react-redux'
import {RouteProps} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

import {ReduxStore} from '../state/Store'
import Router, {OnInit} from './Router'

export interface AppProps {
  store: ReduxStore,
  routes: RouteProps[],
  onInit?: OnInit,
}

const App: SFC<AppProps> = ({store, routes, onInit}) => (
  <Provider store={store}>
    <BrowserRouter>
      <Router routes={routes} onInit={onInit} />
    </BrowserRouter>
  </Provider>
)

if (module.hot) {
  module.hot.accept()
}

export default App
