import React, {Component} from 'react'
import {Provider} from 'react-redux'

import Routes from '../Routes'
import * as Store from '../state/Store'

const store = Store.create(Store.initialState)

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
