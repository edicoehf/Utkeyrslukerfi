import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { useSelector } from 'react-redux'

const DetailsScreen = ({ route }) => {
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const { delivery } = route.params
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')

  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
  }, [])

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
      <TextInput
        multiline
        editable={false}
        numberOfLines={4}
        defaultValue={customerComment}
        onChangeText={(text) => setCustomerComment({ text })}
      />

      <Text>Athugasemd bílstjóra</Text>
      <TextInput
        multiline
        placeholder='Setjið inn athugasemd ef einhver...'
        numberOfLines={4}
        defaultValue={driverComment}
        onChangeText={(text) => setDriverComment({ text })}
      />

    </View>
  )
}

export default DetailsScreen
