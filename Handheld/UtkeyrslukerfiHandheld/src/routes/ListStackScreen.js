import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogoutButton from '../components/LogoutButton'
// Views
import ListScreen from '../views/ListScreen'
import { BLUE } from '../constants'

const ListStack = createStackNavigator()

const ListStackScreen = () => {
  return (
    <ListStack.Navigator
      initialRouteName='List'
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: BLUE,
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <LogoutButton/>
        )
      }}
    >
      <ListStack.Screen name='List' component={ListScreen} options={{title: "Listi yfir sendingar"}}/>
    </ListStack.Navigator>
  )
}

export default ListStackScreen
