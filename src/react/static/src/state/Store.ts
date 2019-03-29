import {identity} from 'ramda'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {reduxThunkContextMiddleware} from 'redux-thunk-context'

import * as Auth from './AuthState'
import {ReduxState} from './StateTypes'

declare global {
  /**
   * Extend the Window object's type to support Redux devtools
   */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__? (f?: any): any, // tslint:disable-line no-any - debug tooling
  }

  interface NodeModule {
    hot: {
      accept (path?: string[], callback?: () => void): void
    }
  }
}

export type ReduxStore = ReturnType<typeof create>

export const initialState: ReduxState = {
  auth: Auth.initialState,
}

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = identity
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

const rootReducer = combineReducers<ReduxState>({
  auth: Auth.reducer,
})

export function create (preloadedState: ReduxState = initialState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(reduxThunkContextMiddleware(() => ({}))),
      devtools
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(['./AuthState'], () => {
      // tslint:disable no-require-imports
      const authModule: typeof Auth = require('./AuthState')
      // tslint:enable no-require-imports

      store.replaceReducer(combineReducers<ReduxState>({
        auth: authModule.reducer,
      }))
    })
  }

  return store
}

export default {create, initialState}
