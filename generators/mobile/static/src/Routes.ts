import {createStackNavigator, createAppContainer} from 'react-navigation'

/**
 * Users
 */
import Login from './screens/LoginScreen'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {title: 'Login'},
  },
}, {initialRouteName: 'Login', headerMode: 'none'})

export default createAppContainer(AppNavigator)
