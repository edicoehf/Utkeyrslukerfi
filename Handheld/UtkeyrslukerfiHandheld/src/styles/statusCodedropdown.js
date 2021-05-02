import { Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth * 0.70
  },
  container: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.50
  },
  preDropdown: {
    backgroundColor: '#fafafa'
  },
  dropdown: {
    minHeight: windowHeight * 0.10,
    maxHeight: windowHeight * 0.30
  },
  items: {
    justifyContent: 'flex-start'
  },
  label: {
    paddingTop: '2%',
    width: windowWidth * 0.40,
    justifyContent: 'flex-start'
  }
})

export default styles
