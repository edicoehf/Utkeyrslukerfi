import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogoutButton from '../components/LogoutButton'
import NameTitle from '../components/NameTitle'
// Views
import SearchScreen from '../views/SearchScreen'
import DetailsScreen from '../views/DetailsScreen'
import DeliverScreen from '../views/DeliverScreen'
import SignForDeliveryScreen from '../views/SignForDeliveryScreen'
import DeliveryReceivedScreen from '../views/DeliveryReceivedScreen'
import ImageOnDeliveryScreen from '../views/ImageOnDeliveryScreen'
import { BLUE } from '../constants'

const SearchStack = createStackNavigator()

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName='Search'
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: BLUE
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <LogoutButton />
        )
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} options={{ title: 'Leita' }} />
      <SearchStack.Screen name='Details' component={DetailsScreen} options={{ headerTitle: <NameTitle /> }} />
      <SearchStack.Screen name='Deliver' component={DeliverScreen} options={{ headerTitle: <NameTitle /> }} />
      <SearchStack.Screen name='ImageOnDelivery' component={ImageOnDeliveryScreen} options={{ headerTitle: <NameTitle /> }} />
      <SearchStack.Screen name='SignForDelivery' component={SignForDeliveryScreen} options={{ headerTitle: <NameTitle /> }} />
      <SearchStack.Screen name='DeliveryReceived' component={DeliveryReceivedScreen} options={{ headerTitle: <NameTitle /> }} />
    </SearchStack.Navigator>
  )
}

export default SearchStackScreen
