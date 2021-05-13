import React from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../../styles/productTable'
import PropTypes from 'prop-types'

// Remove button to remove a delivery from product table or mark package as not being delivered
const RemoveButton = ({ barcode, removeBarcode }) => {
  return (
    <TouchableOpacity onPress={() => { removeBarcode(barcode) }} style={styles.removeButton}>
      <Feather name='x' style={{ width: 26 - 32 }} color='#333' size={24} />
    </TouchableOpacity>
  )
}

RemoveButton.propTypes = {
  // Barcode that is the id of the delivery in the table
  barcode: PropTypes.string.isRequired,
  // Function that triggers when remove button it clicked
  removeBarcode: PropTypes.func.isRequired
}

export default RemoveButton
