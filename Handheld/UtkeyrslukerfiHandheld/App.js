import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScanScreen from './src/views/ScanScreen';
import ListScreen from './src/views/ListScreen';
import SearchScreen from './src/views/SearchScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Scan'>
        <Tab.Screen 
          name='List' 
          component={ListScreen} 
          options={{
            showIcon: true,
            tabBarLabel: 'List',
            tabBarIcon: () => <MaterialCommunityIcon name='format-list-bulleted' style={{width:26-32}} color='#333' size={24} />
          }}
        />
        <Tab.Screen 
          name='Scan'
          component={ScanScreen}
          options={{
            showIcon: true,
            tabBarLabel: 'Scan',
            tabBarIcon: () => <MaterialCommunityIcon name='barcode-scan' style={{width:26-32}} color='#333' size={24} />
          }}
        />
        <Tab.Screen 
          name='Search' 
          component={SearchScreen} 
          options={{
            showIcon: true,
            tabBarLabel: 'Search',
            tabBarIcon: () => <MaterialIcon name='search' style={{width:26-32}} color='#333' size={24} />
          }}
        />
      </Tab.Navigator>  
    </NavigationContainer>
  );
};

export default App;
