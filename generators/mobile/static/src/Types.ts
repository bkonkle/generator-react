import {NavigationInjectedProps} from 'react-navigation'

import {ReduxState} from './state/StateTypes'

export {ReduxState}

export interface NavigationParams {}

export type NavigationProps = NavigationInjectedProps<NavigationParams>
