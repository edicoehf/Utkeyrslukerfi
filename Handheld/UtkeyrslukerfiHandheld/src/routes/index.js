import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchStackScreen from './SearchStackScreen'
// Icons
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
// Views
import ScanScreen from '../views/ScanScreen'
import ListScreen from '../views/ListScreen'

import { blue } from '../constants'

import Header from '../components/Header'

const Tab = createBottomTabNavigator()

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Header></Header>
      <Tab.Navigator
        initialRouteName='Scan'
        tabBarOptions={{
          tabStyle: { backgroundColor: blue }
        }}
      >
        <Tab.Screen
          name='List'
          component={ListScreen}
          options={{
            showIcon: true,
            tabBarLabel: 'List',
            tabBarIcon: () => <MaterialCommunityIcon name='format-list-bulleted' style={{ width: 26 - 32 }} color='#333' size={24} />
          }}
        />
        <Tab.Screen
          name='Scan'
          component={ScanScreen}
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
