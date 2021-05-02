import { Dimensions, StyleSheet } from 'react-native'
import { LIGHTER_BLUE } from '../constants'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80
  },
  size: {
    width: windowWidth * 0.90
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: LIGHTER_BLUE,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    width: windowWidth * 0.9
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  columnHeader: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnHeaderTxt: {
    color: 'black',
    fontWeight: 'bold'
  },
  columnRowTxt: {
    width: '30%',
    textAlign: 'center'
  },
  removeButton: {
    width: '10%',
    textAlign: 'center'
  },
  label: {
    paddingTop: '2%',
    paddingBottom: '1%',
    width: windowWidth * 0.90,
    justifyContent: 'flex-start'
  }
})

export default styles
