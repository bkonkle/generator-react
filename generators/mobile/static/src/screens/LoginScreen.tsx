/* tslint:disable no-require-imports */
import React, {Component} from 'react'
import {View} from 'react-native'

import Login from '../components/user/Login'

export default class LoginScreen extends Component {
  render () {
    return (
      <View>
        <Login />
      </View>
    )
  }
}
