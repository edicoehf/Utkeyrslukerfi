import React from 'react'
import { TextInput, TouchableOpacity, Text } from 'react-native'
import styles from '../../styles/barcodeForm'

// Form to search for, delivery or add delivery to a table
const BarcodeForm = ({ barcode, setBarcode, enterBarcode, labelText }) => {
  return (
    <>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        onChangeText={setBarcode}
        value={barcode}
        placeholder='Strikamerki...'
        style={styles.input}
      />
      <TouchableOpacity
        onPress={enterBarcode}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Bæta við</Text>
      </TouchableOpacity>
    </>
  )
}

export default BarcodeForm
