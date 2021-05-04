import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    padding: 6
  },
  section: {
    marginBottom: 2,
    padding: 4,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 20,
    paddingBottom: 5
  },
  mottakandi: {
    fontSize: 20,
    paddingLeft: 1
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textHighlighted: {
    fontSize: 16,
    textAlign: 'right'
  }
})
