import React from 'react'
import {TextInput, Button } from 'react-native'

// Form to search for, delivery or add delivery to a table
const BarcodeForm = ({ barcode, setBarcode, enterBarcode }) => {
  return (
    <>
      <TextInput 
        onChangeText={setBarcode}
        value={barcode}
        placeholder='Strikamerki...'
        style={{backgroundColor: '#fafafa'}}
      />
      <Button
        onPress={enterBarcode}
        title='Bæta við'
        color='grey'
        accessibilityLabel='Press button to add barcode number'
      />
      </>
  )
}

export default BarcodeForm
