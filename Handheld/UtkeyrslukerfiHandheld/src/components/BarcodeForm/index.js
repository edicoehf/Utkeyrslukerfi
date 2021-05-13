import React from 'react'
import { TextInput, TouchableOpacity, Text, View } from 'react-native'
import styles from '../../styles/barcodeForm'
import PropTypes from 'prop-types';

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

BarcodeForm.propTypes = {
  // Barcode state storing the ID of a delivery
  barcode: PropTypes.string.isRequired,
  // Function to update barcode state
  setBarcode: PropTypes.func.isRequired,
  // Function that triggers when the enter button is pressed
  enterBarcode: PropTypes.func.isRequired,
  // Label for the input box
  labelText: PropTypes.string.isRequired,
  // Function that triggers when the input box is focused on, 
  // used to register which input box is being filled out in SearchScreen 
  setOnFocus: PropTypes.func,
  // String that specifies which input box should be focused on
  onFocusString: PropTypes.string
}

export default BarcodeForm
