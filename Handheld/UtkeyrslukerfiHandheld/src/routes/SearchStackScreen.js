import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// Views
import SearchScreen from '../views/SearchScreen'
import DetailsScreen from '../views/DetailsScreen'
import DeliverScreen from '../views/DeliverScreen'
import DeliveryReceivedScreen from '../views/DeliveryReceivedScreen'

import { blue } from '../constants'

const SearchStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName='Search'
      screenOptions={{
        headerShown: true,
        title: 'Leit',
        headerStyle: {
          backgroundColor: blue
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} />
      <SearchStack.Screen name='Details' component={DetailsScreen} />
      <SearchStack.Screen name='Deliver' component={DeliverScreen} />
      <SearchStack.Screen name='DeliveryReceived' component={DeliveryReceivedScreen} />
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
