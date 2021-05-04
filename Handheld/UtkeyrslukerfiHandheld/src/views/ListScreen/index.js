import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { getDeliveries } from '../../actions/deliveryActions'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryTable from '../../components/DeliveryTable'
import BasicButton from '../../components/BasicButton'

const ListScreen = () => {
  // TODO: Get all deliveries
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const dispatch = useDispatch()
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    dispatch(getDeliveries(token))
  }, [])

  // TODO: Open map with locations of deliveries marked (C Krafa)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BasicButton buttonText='Opna kort' />
      <DeliveryTable data={deliveries} />
    </View>
  )
}

export default ListScreen
