import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchStackScreen from './SearchStackScreen'
import ScanStackScreen from './ScanStackScreen'
import ListStackScreen from './ListStackScreen'
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// Views

import { BLUE, LIGHT_BLUE } from '../constants'

const Tab = createBottomTabNavigator()

// AppContainer contains the routes of the application which are located at the bottom bar
// By default Scan page is the landing page.
const AppContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Scan'
        tabBarOptions={{
          tabStyle: { backgroundColor: BLUE },
          activeTintColor: LIGHT_BLUE,
          inactiveTintColor: 'white'
        }}
      >
        <Tab.Screen
          name='List'
          component={ListStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: ({ focused, color }) => {
              const iconName = focused ? 'view-list' : 'view-list-outline'
              return <MaterialCommunityIcon name={iconName} size={45} color={color} />
            },
            tabBarAccessibilityLabel: 'ListScreen'
          }}
        />
        <Tab.Screen
          name='Scan'
          component={ScanStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: ({ focused, color }) => {
              const iconName = focused ? 'barcode-scan' : 'barcode'
              return <MaterialCommunityIcon name={iconName} style={{ width: 26 - 32 }} color={color} size={45} />
            },
            tabBarAccessibilityLabel: 'ScanScreen'
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: ({ focused, color }) => {
              const iconName = focused ? 'magnify-scan' : 'magnify'
              return <MaterialCommunityIcon name={iconName} style={{ width: 26 - 32 }} color={color} size={45} />
            },
            tabBarAccessibilityLabel: 'SearchScreen'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
