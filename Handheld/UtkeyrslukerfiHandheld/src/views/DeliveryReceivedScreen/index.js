import React from 'react'
import { View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { setStep } from '../../actions/signingProcessActions'

// To confirm to the driver that the delivery has been received, there is nothing left to do
const DeliveryReceivedScreen = ({ navigation }) => {
  // TODO:
  // - css
  const dispatch = useDispatch()

  const goHome = () => {
    dispatch(setStep(0)) // Reset step counter
    navigation.navigate('Search')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Afhending móttekin</Text>
      <Button title='Heim' onPress={goHome} accessibilityLabel='Continue with delivery.' />
    </View>
  )
}

export default DeliveryReceivedScreen
