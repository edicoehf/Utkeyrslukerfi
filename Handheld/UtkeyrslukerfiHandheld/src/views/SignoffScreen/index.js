import React, { useState } from 'react'
import { View, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import styles from '../../styles/signoffScreen'
import deliveryService from '../../services/deliveryService'
import SignoffName from '../../components/SignoffName'
import SignoffImage from '../../components/SignoffImage'
import SignoffSignature from '../../components/SignoffSignature'

// Let the receiver sign for the delivery with the preconfiguered signoff methods
const SignoffScreen = ({ route, navigation }) => {
  const token = useSelector(({ login }) => login.token)
  const { delivery } = route.params
  const signoffMethods = delivery.signoff.settings // 000 -> SignName TakePic TakeName
  const [stepCounter, setStepCounter] = useState(7) // 111 -> 1 means it's left, 0 it's already done

  // Update database
  const updateDeliveryInDatabase = async () => {
    try {
      const res = await deliveryService.updateDelivery(token, delivery)
      if (res?.status === 400) { return ToastAndroid.showWithGravity('Óheimil beiðni.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 401) { return ToastAndroid.showWithGravity('Notandi er ekki innskráður.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 404) { return ToastAndroid.showWithGravity('Sending fannst ekki.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 204) { return ToastAndroid.showWithGravity('Gögn vistuð', ToastAndroid.LONG, ToastAndroid.TOP) }
    } catch (err) {
      ToastAndroid.showWithGravity('Ekki náðist samband við netþjón', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Fisnish signoff, save signoffs to db and go to delivery received screen
  const finishSignoff = async () => {
    // Update delivery in db so receiver/imageURL/signatureURL is saved
    await updateDeliveryInDatabase()
    navigation.navigate('DeliveryReceived')
  }

  // Using binary operators,
  // check if relevant bit is set in the signoff methods, 1 means that signoff method is required
  // then the stepCounter is checked, if the relevant bit is set it means that the method has not already been checked
  const getRelevantSignoffMethod = () => {
    // 001 - get receivers name
    if ((1 & signoffMethods) && (1 & stepCounter)) {
      return <SignoffName delivery={delivery} stepCounter={stepCounter} setStepCounter={setStepCounter} />
    }
    // 010 - get image of delivery
    if ((2 & signoffMethods) && (2 & stepCounter)) {
      return <SignoffImage delivery={delivery} stepCounter={stepCounter} setStepCounter={setStepCounter} />
    }
    // 100 - get reveivers signature
    if ((4 & signoffMethods) && (4 & stepCounter)) {
      return <SignoffSignature delivery={delivery} stepCounter={stepCounter} setStepCounter={setStepCounter} />
    }
    finishSignoff()
  }

  return (
    <View style={styles.container}>
      {getRelevantSignoffMethod()}
    </View>
  )
}

export default SignoffScreen
