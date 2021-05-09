import React, { useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import deliveryService from '../../services/deliveryService'
import styles from '../../styles/searchPageStyles'

// Driver can scan a delivery barcode and get details about it or deliver a delivery
const SearchScreen = ({ navigation }) => {
  const [barcodeDetails, setBarcodeDetails] = useState('')
  const [barcodeDeliver, setBarcodeDeliver] = useState('')
  const token = useSelector(({ login }) => login.token)

  // Got to details/deliver page if delivery exists
  const searchForDelivery = async () => {
    const delivery = await getDelivery(barcodeDetails)
    setBarcodeDetails('')
    if (delivery) {
      navigation.navigate('Details', { delivery: delivery })
    }
  }

  // Go to deliver page if delivery exists
  const deliverDelivery = async () => {
    const delivery = await getDelivery(barcodeDeliver)
    setBarcodeDeliver('')
    if (delivery) {
      navigation.navigate('Deliver', { delivery: delivery })
    }
  }

  const getDelivery = async (barcode) => {
    if (!barcode) {
      ToastAndroid.showWithGravity('Strikamerki er ekki til staðar', ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    try {
      const res = await deliveryService.getDelivery(token, barcode)
      if (res?.status === 400) { ToastAndroid.showWithGravity('Óheimil beiðni.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 401) { ToastAndroid.showWithGravity('Notandi er ekki innskráður.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 404) { ToastAndroid.showWithGravity('Sending fannst ekki.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 200) { return await res.json() }
    } catch (_) {
      ToastAndroid.showWithGravity('Ekki náðist samband við netþjón', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.section}>
        <Text style={styles.mainText}>Skanna fyrir nánari upplýsingar</Text>
        <BarcodeForm barcode={barcodeDetails} setBarcode={setBarcodeDetails} enterBarcode={searchForDelivery} labelText='Strikamerki sendingar' />
      </View>
      <View style={styles.section}>
        <Text style={styles.mainText}>Skanna til að afhenda</Text>
        <BarcodeForm barcode={barcodeDeliver} setBarcode={setBarcodeDeliver} enterBarcode={deliverDelivery} labelText='Strikamerki sendingar' />
      </View>
    </View>
  )
}

export default SearchScreen
