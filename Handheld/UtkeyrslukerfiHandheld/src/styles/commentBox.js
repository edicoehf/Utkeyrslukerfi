import { Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  commentBox: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.10,
    width: windowWidth * 0.90,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  label: {
    width: windowWidth * 0.90,
    justifyContent: 'flex-start',
    paddingTop: '2%'
  }
})

export default styles
