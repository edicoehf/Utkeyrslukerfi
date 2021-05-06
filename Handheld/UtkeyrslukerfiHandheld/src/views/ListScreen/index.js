import React, { useEffect } from 'react'
import { View, Alert, TouchableOpacity } from 'react-native'
import { getDeliveries } from '../../actions/deliveryActions'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryTable from '../../components/DeliveryTable'
import styles from '../../styles/listScreenStyles'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ListScreen = () => {
  // TODO: Get all deliveries
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const dispatch = useDispatch()
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    dispatch(getDeliveries(token))
  }, [])

  // optional function for the open to map
  const floatingButtonEvent = () => {
    Alert.alert('Floating Button Clicked')
  }

  // TODO: Open map with locations of deliveries marked (C Krafa)
  return (
    <View style={styles.container}>
      <DeliveryTable data={deliveries} />
      <TouchableOpacity activeOpacity={0.5} onPress={floatingButtonEvent} style={styles.touchableOpacityStyle}>
        <MaterialCommunityIcon name='google-maps' style={styles.floatingButtonStyle} />
      </TouchableOpacity>
    </View>
  )
}

export default ListScreen
