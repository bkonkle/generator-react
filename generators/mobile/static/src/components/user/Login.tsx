import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {NavigationInjectedProps, withNavigation} from 'react-navigation'

import {NavigationParams} from '../../Types'

export interface Props extends NavigationInjectedProps<NavigationParams> {}

export class Login extends Component<Props> {
  render () {
    return (
      <View>
        <Text>Welcome!</Text>
      </View>
    )
  }
}

export default withNavigation(Login)
