import React from 'react'
import { TextInput, TouchableOpacity, Text, View } from 'react-native'
import styles from '../../styles/barcodeForm'

// Form to search for a delivery or add delivery to a table
const BarcodeForm = ({ barcode, setBarcode, enterBarcode, labelText, setOnFocus, onFocusString }) => {
  const setTextInput = () => {
    if (setOnFocus && onFocusString) {
      return (
        <TextInput
          onChangeText={setBarcode}
          value={barcode}
          placeholder='Strikamerki...'
          style={styles.input}
          onFocus={() => setOnFocus(onFocusString)}
        />
      )
    } else {
      return (
        <TextInput
          onChangeText={setBarcode}
          value={barcode}
          placeholder='Strikamerki...'
          style={styles.input}
        />
      )
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{labelText}</Text>
        {setTextInput()}
      </View>
      <TouchableOpacity
        onPress={enterBarcode}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Bæta við</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BarcodeForm
