import { StyleSheet } from 'react-native'
import { LIGHT_GRAY } from '../constants'

export default StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center'
  },
  section: {
    marginBottom: 15,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 3,
    borderColor: LIGHT_GRAY,
    borderWidth: 1
  },
  mainText: {
    fontSize: 20,
    paddingLeft: 1
  }
})
