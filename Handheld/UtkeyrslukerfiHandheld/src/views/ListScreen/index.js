import React, { useEffect } from 'react'
import { View } from 'react-native'
import { getDeliveries } from '../../actions/deliveryActions'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryTable from '../../components/DeliveryTable'
import styles from '../../styles/listScreenStyles'

const ListScreen = () => {
  const deliveries = useSelector(({ deliveries }) => deliveries)
  const dispatch = useDispatch()
  const token = useSelector(({ login }) => login.token)

  useEffect(() => {
    dispatch(getDeliveries(token))
  }, [])

  return (
    <View style={styles.container}>
      <DeliveryTable data={deliveries} />
    </View>
  )
}

export default ListScreen
