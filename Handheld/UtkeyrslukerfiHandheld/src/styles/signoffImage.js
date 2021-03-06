import { Dimensions, StyleSheet } from 'react-native'
import { LIGHT_GRAY } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  image: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    overflow: 'hidden',
    borderColor: LIGHT_GRAY,
    borderWidth: windowWidth * 0.005,
    borderRadius: 5,
    margin: windowHeight * 0.01
  },
  buttonContainer: {
    height: windowHeight * 0.10,
    width: windowWidth * 0.80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '2%',
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 0.03,
    left: windowWidth * 0.1
  },
  label: {
    width: windowWidth * 0.9,
    fontSize: windowHeight * 0.03
  }
})

export default styles
