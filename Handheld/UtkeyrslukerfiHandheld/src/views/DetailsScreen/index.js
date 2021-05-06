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
      if (res?.status === 400) { ToastAndroid.showWithGravity('Óheimil beiðni.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 401) { ToastAndroid.showWithGravity('Notandi er ekki innskráður.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 404) { ToastAndroid.showWithGravity('Sending fannst ekki.', ToastAndroid.LONG, ToastAndroid.TOP) }
      if (res?.status === 204) { ToastAndroid.showWithGravity('Gögn vistuð', ToastAndroid.LONG, ToastAndroid.TOP) }
    } catch (error) {
      ToastAndroid.showWithGravity('Ekki náðist samband við netþjón', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }

  // Navigate to deliver screen
  const deliver = () => {
    navigation.navigate('Deliver', { delivery: delivery })
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.section}>
        <Text style={styles.receiver}>Móttakandi</Text>
        <Text>Nafn: <Text style={styles.textHighlighted}>{delivery.recipient}</Text>
        </Text>
        <Text>Götuheiti: <Text style={styles.textHighlighted}>{delivery.deliveryAddress.streetName} {delivery.deliveryAddress.houseNumber}</Text>
        </Text>
        <Text>Borg: <Text style={styles.textHighlighted}>{delivery.deliveryAddress.zipCode} {delivery.deliveryAddress.city}</Text>
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.receiver}>Sending</Text>
        <Text>Sendingarnúmer: <Text style={styles.textHighlighted}>{delivery.id}</Text>
        </Text>
        <Text>Fjöldi pakka í sendingu: <Text style={styles.textHighlighted}>{delivery.packages.length}</Text>
        </Text>
        <Text>Staða sendingar: <Text style={styles.textHighlighted}>{availableStatusCodes[delivery.status]}</Text>
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
