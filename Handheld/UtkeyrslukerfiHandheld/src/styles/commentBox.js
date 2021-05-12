import { Dimensions, StyleSheet } from 'react-native'
import { LIGHT_GRAY, WHITE } from '../constants'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  commentBox: {
    backgroundColor: WHITE,
    height: windowHeight * 0.10,
    width: windowWidth * 0.90,
    borderColor: LIGHT_GRAY,
    borderWidth: 0.5,
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  label: {
    width: windowWidth * 0.90,
    justifyContent: 'flex-start',
    paddingTop: '2%'
  },
  commentBoxDisabled: {
    height: windowHeight * 0.10,
    width: windowWidth * 0.90,
    borderColor: LIGHT_GRAY,
    borderWidth: 0.5,
    borderRadius: 5,
    textAlignVertical: 'top',
    color: 'black'
  }
})

export default styles
