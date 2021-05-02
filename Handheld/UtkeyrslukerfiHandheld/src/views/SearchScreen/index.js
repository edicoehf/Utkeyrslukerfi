import React, { useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import BarcodeForm from '../../components/BarcodeForm'
import deliveryService from '../../services/deliveryService'

// Driver can scan a delivery barcode and get details about it or deliver a delivery
const SearchScreen = ({ navigation }) => {
  // TODO:
  // - Override backbutton to decrement step counter
  // - css
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
      ToastAndroid.show('Strikamerki er ekki til staðar', ToastAndroid.LONG)
      return
    }
    try {
      const del = await deliveryService.getDelivery(token, barcode)
      if (del?.errors) {
        ToastAndroid.show(del.errors.Message[0], ToastAndroid.LONG)
        return
      }
      return del
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Skanna fyrir nánri upplýsingar</Text>
      <BarcodeForm barcode={barcodeDetails} setBarcode={setBarcodeDetails} enterBarcode={searchForDelivery} labelText='Strikamerki sendingar' />
      <Text>Skanna til að afhenda</Text>
      <BarcodeForm barcode={barcodeDeliver} setBarcode={setBarcodeDeliver} enterBarcode={deliverDelivery} labelText='Strikamerki sendingar' />
    </View>
  )
}

export default SearchScreen
