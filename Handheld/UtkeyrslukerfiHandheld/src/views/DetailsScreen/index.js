import React, { useEffect, useState } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CommentBox from '../../components/CommentBox'
import deliveryService from '../../services/deliveryService'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/detailPageStyles'
import { setRecipient } from '../../actions/recipientTitleActions'

// Driver can view details about delivery, comment on it or start delivery
const DetailsScreen = ({ route, navigation }) => {
  // TODO:
  // - css
  const availableStatusCodes = useSelector(({ statusCode }) => statusCode)
  const { delivery } = route.params
  const [customerComment, setCustomerComment] = useState('')
  const [driverComment, setDriverComment] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    // dispatching the name so it can be in the header
    dispatch(setRecipient(delivery.recipient))
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
    <View style={styles.mainView}>
      <View style={styles.section}>
        <Text style={styles.mottakandi}>Móttakandi</Text>
        <Text style={styles.nameText}>Nafn: <Text>{delivery.recipient}</Text>
        </Text>
        <Text>Götuheiti: <Text>{delivery.deliveryAddress.streetName} {delivery.deliveryAddress.houseNumber}</Text>
        </Text>
        <Text>Borg: <Text>{delivery.deliveryAddress.zipCode} {delivery.deliveryAddress.city}</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.mottakandi}>Sending</Text>
        <Text>Sendingarnúmer: <Text>{delivery.id}</Text>
        </Text>
        <Text>Fjöldi pakka í sendingu: <Text>{delivery.packages.length}</Text>
        </Text>
        <Text>Staða sendingar: <Text>{availableStatusCodes[delivery.status]}</Text>
        </Text>
      </View>
      <CommentBox label='Athugasemd viðskiptavinar' editable={false} comment={customerComment} setComment={setCustomerComment} />
      <CommentBox label='Athugasemd bílstjóra' editable comment={driverComment} setComment={setDriverComment} />
      <View style={styles.bottomButtons}>
        <BasicButton buttonText='Vista' onPressFunction={saveComment} />
        <BasicButton buttonText='Afhenda' onPressFunction={deliver} />
      </View>
    </View>
  )
}

export default DetailsScreen
