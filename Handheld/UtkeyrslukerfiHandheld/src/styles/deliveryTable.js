import { StyleSheet } from 'react-native'
import { LIGHTER_BLUE } from '../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: LIGHTER_BLUE,
    borderTopEndRadius: 1,
    borderTopStartRadius: 1,
    height: 50
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  columnHeader: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  columnRowTxt: {
    width: '33%',
    textAlign: 'center'
  },
  flatList: {
    width: '100%'
  }
})

export default styles
