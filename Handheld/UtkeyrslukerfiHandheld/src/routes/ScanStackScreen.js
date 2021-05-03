import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LogoutButton from '../components/LogoutButton'
// Views
import ScanScreen from '../views/ScanScreen'
import { BLUE } from '../constants'

const ScanStack = createStackNavigator()

const ScanStackScreen = () => {
  return (
    <ScanStack.Navigator
      initialRouteName='Scan'
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
      <ScanStack.Screen name='Scan' component={ScanScreen} options={{title: "Skanna"}}/>
    </ScanStack.Navigator>
  )
}

export default ScanStackScreen
