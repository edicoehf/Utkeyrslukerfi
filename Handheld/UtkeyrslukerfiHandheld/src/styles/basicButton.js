import { Dimensions, StyleSheet } from 'react-native'
import { DARK_GRAY, LIGHTER_BLUE, LIGHT_GRAY } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  button: {
    backgroundColor: LIGHTER_BLUE,
    height: windowHeight * 0.07,
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '2%'
  },
  buttonDisabled: {
    backgroundColor: LIGHT_GRAY,
    height: windowHeight * 0.07,
    width: windowWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '2%'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonTextDisabled: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_GRAY
  }
})

export default styles
