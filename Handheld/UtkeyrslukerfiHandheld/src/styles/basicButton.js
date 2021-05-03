import { Dimensions, StyleSheet } from 'react-native'
import { LIGHTER_BLUE } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  button: {
    backgroundColor: LIGHTER_BLUE,
    height: windowHeight * 0.05,
    width: windowWidth * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '2%'
  },
  buttonText: {
    fontWeight: 'bold'
  }
})

export default styles
