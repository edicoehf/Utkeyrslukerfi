import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const DetailsScreen = ({ route }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const { delivery } = route.params

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Móttakandi:</Text>
      <Text>Nafn</Text>
      <Text>{delivery.recipient}</Text>
      <Text>Sími</Text>
      <Text>...</Text>
      <Text>Götuheiti:</Text>
      <Text>{delivery.deliveryAddress.streetName} {delivery.deliveryAddress.houseNumber}</Text>
      <Text>Borg:</Text>
      <Text>{delivery.deliveryAddress.zipCode} {delivery.deliveryAddress.city}</Text>

      <Text>Sending:</Text>
      <Text>Búið til</Text>
      <Text>...:</Text>
      <Text>Sendingarnúmer</Text>
      <Text>{delivery.id}</Text>
      <Text>Fjöldi pakka í sendingu</Text>
      <Text>{delivery.packages.length}</Text>
      <Text>Staða sendingar</Text>
      <Text>{availableStatusCodes[delivery.status]}</Text>

      <Text>Athugasemd viðskiptavinar</Text>
      <Text>{delivery.customerComment? delivery.customerComment : 'None'}</Text>

      <Text>Athugasemd bílstjóra</Text>
      <Text>{delivery.driverComment? delivery.driverComment : 'None'}</Text>

    </View>
  )
}

export default DetailsScreen
