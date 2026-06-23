import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminDashboard from '../screens/admin/AdminDashboard';
import AdminMenuManagementScreen from '../screens/admin/AdminMenuManagementScreen';
import AdminCategoryManagementScreen from '../screens/admin/AdminCategoryManagementScreen';
import AdminMenuItemFormScreen from '../screens/admin/AdminMenuItemFormScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';

import AdminOrdersScreen from '../screens/admin/AdminOrdersScreen';
import AdminOrderDetailsScreen from '../screens/admin/AdminOrderDetailsScreen';

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Dashboard */}
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
      />

      {/* Menu Management */}
      <Stack.Screen
        name="AdminMenuManagement"
        component={AdminMenuManagementScreen}
      />

      {/* Alias used by AdminDashboard */}
      <Stack.Screen
        name="AdminMenu"
        component={AdminMenuManagementScreen}
      />

      {/* Category Management */}
      <Stack.Screen
        name="AdminCategoryManagement"
        component={AdminCategoryManagementScreen}
      />

      {/* Alias used by AdminDashboard */}
      <Stack.Screen
        name="AdminCategories"
        component={AdminCategoryManagementScreen}
      />

      {/* Menu Item Form */}
      <Stack.Screen
        name="AdminMenuItemForm"
        component={AdminMenuItemFormScreen}
      />

      {/* Users */}
      <Stack.Screen
        name="AdminUsers"
        component={AdminUsersScreen}
      />
            {/* Orders */}
      <Stack.Screen
        name="AdminOrders"
        component={AdminOrdersScreen}
      />

      <Stack.Screen
        name="AdminOrderDetails"
        component={AdminOrderDetailsScreen}
      />

      {/* Settings */}
      <Stack.Screen
        name="AdminSettings"
        component={AdminSettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;