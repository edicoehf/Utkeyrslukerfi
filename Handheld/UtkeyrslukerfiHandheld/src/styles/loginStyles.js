import { StyleSheet } from 'react-native'
import { GRAY_98 } from '../constants'

export default StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  dropDown: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
    marginHorizontal: 5,
    padding: 5,
  },
  mainText: {
    fontSize: 20,
    paddingLeft: 1
  },
  loginButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dropDownStyle: {
    backgroundColor: GRAY_98,
    minHeight: 40,
    maxHeight: 120
  },
  itemStyle: {
    justifyContent: 'flex-start'
  },
  containerStyle: {
    height: 40
  },
  dropDownPickerStyle: {
    backgroundColor: GRAY_98
  }
})
