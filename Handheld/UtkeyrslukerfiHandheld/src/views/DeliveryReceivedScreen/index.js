import React from 'react'
import { View, Text } from 'react-native'
import BasicButton from '../../components/BasicButton'

// To confirm to the driver that the delivery has been received, there is nothing left to do
const DeliveryReceivedScreen = ({ navigation }) => {
  // TODO:
  // - css

  const goHome = () => {
    navigation.navigate('Search')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Afhending móttekin</Text>
      <BasicButton buttonText='Heim' onPressFunction={goHome} />
    </View>
  )
}

export default DeliveryReceivedScreen
