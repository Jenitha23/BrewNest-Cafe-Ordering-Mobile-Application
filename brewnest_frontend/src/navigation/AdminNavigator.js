import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../theme/colors';

// Existing Screens
import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';

// Menu Management Screens
import AdminMenuManagementScreen from '../screens/admin/AdminMenuManagementScreen';
import AdminCategoryManagementScreen from '../screens/admin/AdminCategoryManagementScreen';
import AdminMenuItemFormScreen from '../screens/admin/AdminMenuItemFormScreen';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
          fontSize: 18,
          fontWeight: '700',
        },
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          title: 'Admin Dashboard',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AdminMenuManagement"
        component={AdminMenuManagementScreen}
        options={{
          title: 'Menu Management',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AdminCategoryManagement"
        component={AdminCategoryManagementScreen}
        options={{
          title: 'Category Management',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AdminMenuItemForm"
        component={AdminMenuItemFormScreen}
        options={{
          title: 'Menu Item',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AdminUsers"
        component={AdminUsersScreen}
        options={{
          title: 'Users Management',
        }}
      />

      <Stack.Screen
        name="AdminSettings"
        component={AdminSettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;