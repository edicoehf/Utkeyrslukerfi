import React, { useState } from 'react'
import { TextInput, Text, View, ToastAndroid } from 'react-native'
import styles from '../../styles/singoffName'
import BasicButton from '../BasicButton'

// Signoff Name, gets receivers name during delivery
const SignoffName = ({ delivery, stepCounter, setStepCounter }) => {
  const [name, setName] = useState(delivery.recipient)

  // Continue to next signoff or finish the delivery
  const continueWithDelivery = () => {
    if (!name) {
      ToastAndroid.showWithGravity('Vinsamlegast settu inn nafn móttakanda.', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    delivery.recipient = name

    // Mark SignoffName as done (0)
    setStepCounter(stepCounter ^ 1)
  }
  return (
    <>
      <Text style={styles.label}>Nafn móttakanda:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <View style={styles.buttonContainer}>

        <BasicButton buttonText='Vista' onPressFunction={continueWithDelivery} />
      </View>
    </>
  )
}

export default SignoffName
