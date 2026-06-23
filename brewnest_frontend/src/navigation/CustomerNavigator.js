import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';
import { colors } from '../theme/colors';

// Existing Screens
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import ProfileScreen from '../screens/customer/ProfileScreen';
import SettingsScreen from '../screens/customer/SettingsScreen';

// Menu / Cart Screens
import MenuItemDetailsScreen from '../screens/customer/MenuItemDetailsScreen';
import CartScreen from '../screens/customer/CartScreen';

import CustomerOrdersScreen from '../screens/customer/CustomerOrdersScreen';
import CustomerOrderDetailsScreen from '../screens/customer/CustomerOrderDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={CustomerDashboard} />
      <Stack.Screen name="MenuItemDetails" component={MenuItemDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuDashboard" component={CustomerDashboard} />
      <Stack.Screen name="MenuItemDetails" component={MenuItemDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CustomerOrders"
        component={CustomerOrdersScreen}
      />

      <Stack.Screen
        name="OrderDetails"
        component={CustomerOrderDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const CustomerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'coffee' : 'coffee-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,

        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,

          paddingTop: 8,
          paddingBottom: Platform.OS === 'android' ? 8 : 18,
          height: Platform.OS === 'android' ? 68 : 82,

          elevation: 10,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 3,
        },

        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarLabel: 'Menu',
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;