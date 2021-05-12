import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogoutButton from '../components/LogoutButton'
import NameTitle from '../components/NameTitle'
// Views
import ListScreen from '../views/ListScreen'
import DetailsScreen from '../views/DetailsScreen'
import { BLUE } from '../constants'

const ListStack = createStackNavigator()

const ListStackScreen = () => {
  return (
    <ListStack.Navigator
      initialRouteName='List'
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
      <ListStack.Screen name='List' component={ListScreen} options={{ title: 'Listi yfir sendingar' }} />
      <ListStack.Screen name='Details' component={DetailsScreen} options={{ headerTitle: <NameTitle /> }} />
    </ListStack.Navigator>
  )
}

export default ListStackScreen
