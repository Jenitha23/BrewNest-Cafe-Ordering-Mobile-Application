// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import CustomerLoginScreen from '../screens/CustomerLoginScreen';
import CustomerSignupScreen from '../screens/CustomerSignupScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
      <Stack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="CustomerHome" component={HomeScreen} />
      <Stack.Screen name="AdminHome" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;