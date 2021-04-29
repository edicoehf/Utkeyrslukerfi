import React, { useState } from 'react'
import { View, Text, ToastAndroid, TextInput } from 'react-native'
import Signature from 'react-native-signature-canvas'

// Let the receiver sign for the delivery
const SignForDeliveryScreen = ({ navigation }) => {
  // TODO:
  // - css
  const [name, setName] = useState('')

  const handleSignature = (signature) => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.show('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG)
      return
    }
    console.log(signature)
    navigation.navigate('DeliveryReceived')
  }

  const handleEmpty = () => { ToastAndroid.show('Undirskrift vantar.', ToastAndroid.LONG) }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nafn móttakanda:</Text>
      <TextInput
        onChangeText={setName}
      />
      <Signature 
        onOK={handleSignature}
        onEmpty={handleEmpty}
        descriptionText='Undirskrift móttakanda'
        clearText='Hreinsa'
        confirmText='Vista'
      />
    </View>
  )
}

export default SignForDeliveryScreen
