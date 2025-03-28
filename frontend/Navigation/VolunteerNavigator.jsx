import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VolunteerProfile from '../Screens/volunteer/VolunteerProfile';
import VolunteerDeliveries from '../Screens/volunteer/VolunteerDeliveries';
import { StyleSheet, Text, View } from 'react-native';
import OrderTracking from "../Screens/charity/OrderTracking";
import DeliveryTracking from '../Screens/charity/OrderTracking';
import VolunteerDeliveryTracking from '../Screens/volunteer/VolunteerOrderTracking';

const Tab = createBottomTabNavigator();

const tabData = [
  {
    name: 'Deliveries',
    component: VolunteerDeliveries,
    icons: {
      inactive: 'home-outline',
      active: 'home',
    },
  },
  {
    name: 'Track',
    component: VolunteerDeliveryTracking,
    icons: {
      inactive: 'map-outline',
      active: 'map',
    },
  },
  {
    name: 'Profile',
    component: VolunteerProfile,
    icons: {
      inactive: 'person-outline',
      active: 'person',
    },
  },
];

const VolunteerNavigator = () => {
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

const Tile = ({ title, description }) => {
  return (
    <View style={styles.tileContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default VolunteerNavigator;
