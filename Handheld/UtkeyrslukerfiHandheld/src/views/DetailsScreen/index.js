import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import CommentBox from '../../components/CommentBox'

// Driver can view details about delivery, comment on it or start delivery
const DetailsScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  // - update drivers comment in db
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const { delivery } = route.params
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')

  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
  }, [])

  // Save drivers comment to db
  const saveComment = () => {
    // update db with new comment from driver
  }

  // Navigate to deliver screen
  const deliver = () => {
    navigation.navigate('Deliver', { delivery: delivery })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Móttakandi:</Text>
      <Text>Nafn</Text>
      <Text>{delivery.recipient}</Text>
      <Text>Götuheiti:</Text>
      <Text>{delivery.deliveryAddress.streetName} {delivery.deliveryAddress.houseNumber}</Text>
      <Text>Borg:</Text>
      <Text>{delivery.deliveryAddress.zipCode} {delivery.deliveryAddress.city}</Text>

      <Text>Sending:</Text>
      <Text>Sendingarnúmer</Text>
      <Text>{delivery.id}</Text>
      <Text>Fjöldi pakka í sendingu</Text>
      <Text>{delivery.packages.length}</Text>
      <Text>Staða sendingar</Text>
      <Text>{availableStatusCodes[delivery.status]}</Text>

      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable comment={driverComment} setComment={setDriverComment} />

      <Button title='Vista' onPress={saveComment} />
      <Button title='Afhenda' onPress={deliver} />

    </View>
  )
}

export default DetailsScreen
