import React, { useRef, useState } from 'react'
import { View, Text, ToastAndroid, TextInput } from 'react-native'
import Signature from 'react-native-signature-canvas'
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/signForDeliveryScreen'

// Let the receiver sign for the delivery
const SignForDeliveryScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  const [name, setName] = useState('')
  const signingProcess = useSelector(({ signingProcess }) => signingProcess)
  const dispatch = useDispatch()
  const canvasRef = useRef()
  const { delivery } = route.params

  const handleSignature = (signature) => {
    // TODO: save the image on a server and save the link in the db, get the link for the image from signature.data
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    console.log(signature)
    const route = signingProcess.process[signingProcess.step]
    dispatch(setStep(1))
    navigation.navigate(route, { delivery: delivery })
  }

  const handleEmpty = () => { ToastAndroid.showWithGravity('Undirskrift vantar.', ToastAndroid.LONG, ToastAndroid.TOP) }

  const handleClear = () => { canvasRef.current.clearSignature() }

  const handleConfirm = () => { canvasRef.current.readSignature() }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nafn móttakanda:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
      />
      <View style={styles.canvasContainer}>
        <Signature
          ref={canvasRef}
          style={styles.canvas}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          bgColor='#000000'
          webStyle={`
          .m-signature-pad--footer {display: none !important;}
          `}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          buttonText='Hreinsa'
          onPressFunction={handleClear}
        />
        <BasicButton
          buttonText='Vista'
          onPressFunction={handleConfirm}
        />
      </View>
    </View>
  )
}

export default SignForDeliveryScreen
