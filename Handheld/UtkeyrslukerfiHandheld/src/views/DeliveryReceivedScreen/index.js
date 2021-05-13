import React from 'react'
import { View, Text } from 'react-native'
import BasicButton from '../../components/BasicButton'
import styles from '../../styles/deliveryReceivedScreen'
import Feather from 'react-native-vector-icons/Feather'

// To confirm to the driver that the delivery has been received, there is nothing left to do
const DeliveryReceivedScreen = ({ navigation }) => {
  const goHome = () => {
    navigation.navigate('Search')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Afhending móttekin!</Text>
      <Feather name='check-circle' style={styles.checkMark} size={80} />
      <BasicButton buttonText='Heim' onPressFunction={goHome} />
    </View>
  )
}

export default DeliveryReceivedScreen
