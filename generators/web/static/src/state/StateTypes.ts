import {ThunkContextAction} from 'redux-thunk-context'

import {Action as AuthAction, State as AuthState} from './AuthState'

export interface ReduxAction<Name extends string, Payload = unknown, Meta = unknown> {
  type: Name
  payload: Payload extends object ? Payload : undefined
  readonly meta?: Meta
}

export type ReduxState = {
  auth: AuthState,
}

export enum RootActionTypes {
  resetState = 'RootActions.resetState',
}

export type ResetState = ReduxAction<RootActionTypes.resetState>

export type Action =
 | AuthAction
 | ResetState

export interface ReduxContext {}

export type ReduxThunk<R> = ThunkContextAction<R, ReduxState, ReduxContext>
