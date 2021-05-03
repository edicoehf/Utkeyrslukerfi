import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchStackScreen from './SearchStackScreen'
import ScanStackScreen from './ScanStackScreen'
import ListStackScreen from './ListStackScreen'
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
// Views

import { BLUE } from '../constants'

const Tab = createBottomTabNavigator()

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Scan'
        tabBarOptions={{
          tabStyle: { backgroundColor: BLUE }
        }}
      >
        <Tab.Screen
          name='List'
          component={ListStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: 'List',
            tabBarIcon: () => <MaterialCommunityIcon name='format-list-bulleted' style={{ width: 26 - 32 }} color='#333' size={24} />
          }}
        />
        <Tab.Screen
          name='Scan'
          component={ScanStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: 'Scan',
            tabBarIcon: () => <MaterialCommunityIcon name='barcode-scan' style={{ width: 26 - 32 }} color='#333' size={24} />
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchStackScreen}
          options={{
            showIcon: true,
            tabBarLabel: 'Search',
            tabBarIcon: () => <MaterialIcon name='search' style={{ width: 26 - 32 }} color='#333' size={24} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
