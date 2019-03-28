import React, {Component} from 'react'
import {RouteProps, RouteComponentProps, withRouter} from 'react-router'
import {Switch, Route} from 'react-router-dom'

export type OnInit = (navData: Pick<RouteComponentProps<{}>, 'history' | 'location'>) =>
  Promise<void>

export interface Props extends RouteComponentProps<{}> {
  routes: RouteProps[],
  onInit?: OnInit,
}

export class Router extends Component<Props> {
  async componentDidMount () {
    const {onInit, history, location} = this.props

    if (onInit) {
      await onInit({history, location})
    }
  }

  render () {
    const {routes} = this.props

    return (
      <Switch>
        {routes.map(route => <Route key={`${route.path}`} {...route} />)}
      </Switch>
    )
  }
}

export default withRouter(Router)
