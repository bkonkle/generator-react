import React from 'react'
import {RouteProps} from 'react-router-dom'
import Loadable, {LoadingComponentProps} from 'react-loadable'

import NotFound from './views/NotFound'

export const displayLoading = () => (props: LoadingComponentProps) => {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

const routes: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Loadable({
      loader: async () => import('./views/Login'),
      loading: displayLoading(),
    }),
  },

  /* Catch-all 404 */

  {
    path: '**',
    component: NotFound,
  },
]

export default routes
