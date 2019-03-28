import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'

import BrowserConfig from '../BrowserConfig'
import Store, {ReduxStore} from './state/Store'

interface Props {}

interface State {
  store?: ReduxStore
}

export class DummyApp extends Component<Props, State> {
  state: State = {}

  async componentDidMount () {
    const store = Store.create(Store.initialState)

    this.setState({store})
  }

  render () {
    const {children} = this.props
    const {store} = this.state

    if (store) {
      return (
        <Provider store={store}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </Provider>
      )
    }

    return null
  }
}

export default DummyApp
