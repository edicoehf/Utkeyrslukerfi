import React from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../../styles/productTable'

// Remove button to remove a delivery from product table or mark package as not being delivered
const RemoveButton = ({ barcode, removeBarcode }) => {
  return (
    <TouchableOpacity onPress={() => { removeBarcode(barcode) }} style={styles.removeButton}>
      <Feather name='x' style={{ width: 26 - 32 }} color='#333' size={24} />
    </TouchableOpacity>
  )
}

export default RemoveButton
