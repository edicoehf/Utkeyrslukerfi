import React from 'react'
import { TouchableHighlight } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const RemoveButton = ({ barcode, removeBarcode }) => {
  return (
    <TouchableHighlight onPress={() => { removeBarcode(barcode) }}>
      <Feather name='x' style={{ width: 26 - 32 }} color='#333' size={24} />
    </TouchableHighlight>
  )
}

export default RemoveButton
