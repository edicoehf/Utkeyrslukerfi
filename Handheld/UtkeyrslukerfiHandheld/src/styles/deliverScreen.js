import { Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.10,
    width: windowWidth * 0.50,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '2%',
    alignItems: 'center'
  },
  check: {
    marginRight: '25%'
  }
})

export default styles
