import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CharityProfile from '../Screens/charity/CharityProfile';
import CharityListing from '../Screens/charity/CharityListing';
import { View } from 'react-native';
import OrderTracking from "../Screens/charity/OrderTracking";
const Tab = createBottomTabNavigator();

const tabData = [
  {
    name: 'Food Listing',
    component: CharityListing,
    icons: {
      inactive: 'home-outline',
      active: 'home',
    },
  },
  {
    name: 'Track Order',
    component: OrderTracking,
    icons: {
      inactive: 'map-outline',
      active: 'map',
    },
  },
  {
    name: 'Profile',
    component: CharityProfile,
    icons: {
      inactive: 'person-outline',
      active: 'person',
    },
  },
];

const CharityNavigator = () => {
  return (
    <>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff', // Clean white background
          borderTopWidth: 0, // No border line
          height: 60, // Compact size
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarActiveTintColor: '#2222aa', // Active icon color
        tabBarInactiveTintColor: '#6c757d', // Inactive icon color
        tabBarLabelStyle: {
          fontSize: 10, // Smaller labels
          fontWeight: '500', // Lighter font weight for minimalism
          marginBottom: 7,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
          margin: 0,
        },
      }}>
      {tabData.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused}) => (
              <Ionicons
                name={focused ? tab.icons.active : tab.icons.inactive}
                size={24}
                color={focused ? '#FC8019' : '#FC8019'}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
    </>
  );
};


export default CharityNavigator;
