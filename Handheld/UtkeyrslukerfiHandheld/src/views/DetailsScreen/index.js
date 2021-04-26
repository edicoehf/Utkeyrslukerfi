import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import CommentBox from '../../components/CommentBox'

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

      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable={true} comment={driverComment} setComment={setDriverComment} />

    </View>
  )
}

export default DetailsScreen
