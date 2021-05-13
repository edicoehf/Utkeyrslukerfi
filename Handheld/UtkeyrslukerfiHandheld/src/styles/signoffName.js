import { Dimensions, StyleSheet } from 'react-native'
import { LIGHT_GRAY, WHITE } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {
    backgroundColor: WHITE,
    height: windowHeight * 0.08,
    width: windowWidth * 0.80,
    borderColor: LIGHT_GRAY,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: windowHeight * 0.03
  },
  label: {
    width: windowWidth * 0.80,
    fontSize: windowHeight * 0.03
  },
  buttonContainer: {
    height: windowHeight * 0.10,
    width: windowWidth * 0.80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: '2%',
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 0.03,
    left: windowWidth * 0.1
  }
})

export default styles
