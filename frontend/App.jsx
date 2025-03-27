import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './Navigation/AppNavigation';
import AuthProvider from './context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
        <AppNavigator/>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
