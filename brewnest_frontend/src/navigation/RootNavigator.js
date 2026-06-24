import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import AdminNavigator from './AdminNavigator';

import PaymentScreen from '../screens/customer/PaymentScreen';
import CheckoutScreen from '../screens/customer/CheckoutScreen';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoading, isAuthenticated, userRole } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner visible={true} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* AUTH FLOW */}
      {!isAuthenticated && (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}

      {/* MAIN APP */}
      {isAuthenticated && userRole === 'ADMIN' && (
        <Stack.Screen name="Admin" component={AdminNavigator} />
      )}

      {isAuthenticated && userRole === 'CUSTOMER' && (
        <Stack.Screen name="Customer" component={CustomerNavigator} />
      )}

      {/* GLOBAL SCREENS (ALWAYS AVAILABLE) */}
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />

    </Stack.Navigator>
  );
};

export default RootNavigator;