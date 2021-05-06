import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    padding: 6
  },
  section: {
    marginBottom: 4,
    padding: 4,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    paddingBottom: 5
  },
  receiver: {
    fontSize: 25,
    paddingLeft: 1
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  textHighlighted: {
    fontSize: 16,
    textAlign: 'right'
  }
})
