import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { getDeliveries } from '../../actions/deliveryActions'
import { useDispatch, useSelector } from 'react-redux'

const ListScreen = () => {
  // TODO: Get all deliveries
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const dispatch = useDispatch()
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    dispatch(getDeliveries(token))
  }, [])
  console.log(deliveries)
  // TODO: Display all deliveries in a list/table
  // TODO: Allow user to sort by ID, Date, Status (?)
  // TODO: Open map with locations of deliveries marked (C Krafa)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Opna kort' />
      <Text>List Screen</Text>
    </View>
  )
}

export default ListScreen
