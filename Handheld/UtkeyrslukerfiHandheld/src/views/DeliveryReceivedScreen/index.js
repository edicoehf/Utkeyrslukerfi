import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button } from 'react-native'
import BarcodeForm from '../../components/BarcodeForm'
import CommentBox from '../../components/CommentBox'
import ProductTable from '../../components/ProductTable'
import RemoveButton from '../../components/RemoveButton'
import CheckBox from '@react-native-community/checkbox'

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
      <Button title='Heim' onPress={goHome} accessibilityLabel='Continue with delivery.' />
    </View>
  )
}

export default DeliveryReceivedScreen
