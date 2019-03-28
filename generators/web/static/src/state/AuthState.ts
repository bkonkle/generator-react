import {ReduxAction, ReduxState} from './StateTypes'

export interface State {
  isAuthenticated: boolean,
}

export enum ActionTypes {
  setAuthenticated = 'Auth.setAuthenticated',
}

// Pure actions
export type SetAuthenticated =
  ReduxAction<ActionTypes.setAuthenticated, {isAuthenticated: boolean}>

export type Action = | SetAuthenticated

export const initialState: State = {
  isAuthenticated: false,
}

export const Actions = {
  /**
   * Pure actions
   */
  setAuthenticated: (isAuthenticated: boolean): SetAuthenticated => ({
    type: ActionTypes.setAuthenticated,
    payload: {isAuthenticated},
  }),

}

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.setAuthenticated:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated
      }
    default:
      return state
  }
}

export const Selectors = {
  getState: (state: ReduxState) => state.auth,
  isAuthenticated: (state: ReduxState) => Selectors.getState(state).isAuthenticated,
}
