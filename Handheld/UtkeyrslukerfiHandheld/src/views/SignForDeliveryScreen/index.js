import React, { useState } from 'react'
import { View, Text, ToastAndroid, TextInput } from 'react-native'
import Signature from 'react-native-signature-canvas'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'

// Let the receiver sign for the delivery
const SignForDeliveryScreen = ({ navigation }) => {
  // TODO:
  // - css
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()

  const handleSignature = (signature) => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    console.log(signature)
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(signingProcess.step + 1))
    navigation.navigate(route)
  }

  const handleEmpty = () => { ToastAndroid.showWithGravity('Undirskrift vantar.', ToastAndroid.LONG, ToastAndroid.TOP) }

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
