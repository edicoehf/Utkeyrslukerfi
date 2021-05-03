import React, { useState } from 'react'
import { View, Text, ToastAndroid, TextInput } from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'
import BasicButton from '../../components/BasicButton'

// Let the receiver sign for the delivery
const ImageOnDeliveryScreen = ({ navigation }) => {
  // TODO:
  // - css
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()

  const continueWithDelivery = () => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(signingProcess.step + 1))
    navigation.navigate(route)
  }

  const takeImage = () => { 
    launchCamera()
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Nafn móttakanda:</Text>
      <TextInput
        onChangeText={setName}
      />
      <BasicButton buttonText='Taka mynd' onPressFunction={takeImage} />
      <BasicButton buttonText='Vista' onPressFunction={continueWithDelivery} />
    </View>
  )
}

export default ImageOnDeliveryScreen
