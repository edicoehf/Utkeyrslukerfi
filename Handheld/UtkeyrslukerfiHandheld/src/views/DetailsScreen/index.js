import React, { useEffect, useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import CommentBox from '../../components/CommentBox'
import deliveryService from '../../services/deliveryService'
import BasicButton from '../../components/BasicButton'

// Driver can view details about delivery, comment on it or start delivery
const DetailsScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const { delivery } = route.params
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    if (delivery.driverComment) { setDriverComment(delivery.driverComment) }
    if (delivery.customerComment) { setCustomerComment(delivery.customerComment) }
  }, [])

  // Save drivers comment to db
  const saveComment = async () => {
    try {
      delivery.driverComment = driverComment // Update delivery
      const res = await deliveryService.updateDelivery(token, delivery)
      if (res?.status === 400) { ToastAndroid.show('Óheimil beiðni.', ToastAndroid.LONG) }
      if (res?.status === 401) { ToastAndroid.show('Notandi er ekki innskráður.', ToastAndroid.LONG) }
      if (res?.status === 404) { ToastAndroid.show('Sending fannst ekki.', ToastAndroid.LONG) }
      if (res?.status === 204) { ToastAndroid.show('Gögn vistuð', ToastAndroid.LONG) }
    } catch (error) {
      ToastAndroid.show('Ekki náðist samband við netþjón', ToastAndroid.LONG)
    }
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
      <BasicButton buttonText='Vista' onPressFunction={saveComment} />
      <BasicButton buttonText='Afhenda' onPressFunction={deliver} />
    </View>
  )
}

export default DetailsScreen
