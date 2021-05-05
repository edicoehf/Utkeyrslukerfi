import { Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.05,
    width: windowWidth * 0.50,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: windowWidth * 0.02
  },
  label: {
    width: windowWidth * 0.50,
    justifyContent: 'flex-start',
    marginTop: windowHeight * 0.05
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
