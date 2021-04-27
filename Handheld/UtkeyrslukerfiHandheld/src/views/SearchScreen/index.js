import React, { useState } from 'react'
import { View, Text } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'

// Driver can scan a delivery barcode and get details about it or deliver a delivery
const SearchScreen = ({ navigation }) => {
  // TODO:
  // - remove dummy data and get actual data if barcode is valid
  const [barcodeDetails, setBarcodeDetails] = useState('')
  const [barcodeDeliver, setBarcodeDeliver] = useState('')

  // Got to details page if delivery exists
  const searchForDelivery = async () => {
    // Dummy data:
    const delivery = {
      id: '123447025891',
      recipient: 'Jóna',
      seller: 'HR',
      driverComment: null,
      customerComment: null,
      status: 1,
      driver: {
        id: 1,
        name: 'Mikael Máni Jónsson',
        email: 'Mikaeelmani99@gmail.com',
        role: 1,
        changePassword: false
      },
      pickupAddress: {
        id: 39,
        streetName: 'Menntavegur',
        houseNumber: '1',
        zipCode: '102',
        city: 'Reykjavík',
        country: 'Ísland'
      },
      deliveryAddress: {
        id: 40,
        streetName: 'Borgarholtsbraut',
        houseNumber: '52',
        zipCode: '200',
        city: 'Kópavogur',
        country: 'Ísland'
      },
      vehicle: {
        id: 1,
        licensePlate: 'OUI30',
        length: 3.45,
        height: 1.89,
        width: 1.05
      },
      packages: []
    }
    navigation.navigate('Details', { delivery: delivery })
  }

  // Go to deliver page if delivery exists
  const deliverDelivery = () => {
    navigation.navigate('Deliver')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Skanna fyrir nánri upplýsingar</Text>
      <Text>Strikamerki sendingar</Text>
      <BarcodeForm barcode={barcodeDetails} setBarcode={setBarcodeDetails} enterBarcode={searchForDelivery} />
      <Text>Skanna til að afhenda</Text>
      <Text>Strikamerki sendingar</Text>
      <BarcodeForm barcode={barcodeDeliver} setBarcode={setBarcodeDeliver} enterBarcode={deliverDelivery} />
    </View>
  )
}

export default SearchScreen
