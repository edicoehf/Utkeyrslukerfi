import { Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  canvas: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    margin: windowHeight * 0.05,
    borderColor: '#cccccc',
    borderWidth: 2,
    borderRadius: 5
  },
  canvasContainer: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    right: windowWidth * 0.1
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
