import {Dimensions} from 'react-native'
import {min, max} from 'ramda'

export const Units = {
  vmin: min(
    Dimensions.get('screen').width / 100,
    Dimensions.get('screen').height / 100,
  ),
  vmax: max(
    Dimensions.get('screen').width / 100,
    Dimensions.get('screen').height / 100,
  ),
  vw: (multiplier: number) => multiplier * (Dimensions.get('screen').width / 100),
  vh: (multiplier: number) => multiplier * (Dimensions.get('screen').height / 100),
}

export const Colors = {
  /* Base colors */
  gray: '#d3d3d3',
  darkGray: '#2F4F4F',
  lightGray: '#F4F4F4',
  mediumGray: '#BABABA',
  blue: '#2089dc',
  white: '#FFF',
  red: 'red',

  facebookBlue: '#3b5998',

  /* Semantic color names */
  error: 'red',
}

export default {
  Units,
  Colors,
}
