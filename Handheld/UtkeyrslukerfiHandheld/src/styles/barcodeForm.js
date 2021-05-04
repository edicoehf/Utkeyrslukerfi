import { Dimensions, StyleSheet } from 'react-native'
import { LIGHTER_BLUE } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '2%',
    width: windowWidth * 0.70
  },
  input: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.06,
    width: windowWidth * 0.50,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 5
  },
  button: {
    backgroundColor: LIGHTER_BLUE,
    height: windowHeight * 0.05,
    width: windowWidth * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '2%',
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.025
  },
  buttonText: {
    fontWeight: 'bold'
  },
  label: {
    width: windowWidth * 0.40,
    justifyContent: 'flex-start'
  }
})

export default styles
