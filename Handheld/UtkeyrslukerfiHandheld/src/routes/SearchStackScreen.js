import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// Views
import SearchScreen from '../views/SearchScreen'
import DetailsScreen from '../views/DetailsScreen'
import DeliverScreen from '../views/DeliverScreen'
import SignForDeliveryScreen from '../views/SignForDeliveryScreen'
import DeliveryReceivedScreen from '../views/DeliveryReceivedScreen'
import ImageOnDeliveryScreen from '../views/ImageOnDeliveryScreen'

const SearchStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName='Search'
      screenOptions={{
        headerShown: false
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} />
      <SearchStack.Screen name='Details' component={DetailsScreen} />
      <SearchStack.Screen name='Deliver' component={DeliverScreen} />
      <SearchStack.Screen name='SignForDelivery' component={SignForDeliveryScreen} />
      <SearchStack.Screen name='ImageOnDelivery' component={ImageOnDeliveryScreen} />
      <SearchStack.Screen name='DeliveryReceived' component={DeliveryReceivedScreen} />
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
