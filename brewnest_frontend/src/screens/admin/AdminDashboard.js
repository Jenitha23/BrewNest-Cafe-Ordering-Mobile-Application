import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,  
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { AuthContext } from '../../context/AuthContext';
import AdminScreenBackground from './AdminScreenBackground';

const AdminDashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const [dashboardStats, setDashboardStats] = useState({
    totalItems: 0,
    availableItems: 0,
    unavailableItems: 0,
    categories: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      /**
       * Replace with actual backend API calls later
       */

      setDashboardStats({
        totalItems: 15,
        availableItems: 12,
        unavailableItems: 3,
        categories: 5,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const quickAccessItems = [
    {
      key: 'menu',
      label: 'Menu Items',
      description: 'Add & edit items',
      icon: 'food',
      route: 'AdminMenu',
    },
    {
      key: 'categories',
      label: 'Categories',
      description: 'Organize menu',
      icon: 'shape',
      route: 'AdminCategories',
    },
    {
      key: 'availability',
      label: 'Availability',
      description: 'Stock control',
      icon: 'toggle-switch',
      route: 'AdminMenu',
    },
    {
      key: 'users',
      label: 'Users',
      description: 'Manage accounts',
      icon: 'account-group',
      route: 'AdminUsers',
    },
    {
      key: 'orders',
      label: 'Orders',
      description: 'Track & update',
      icon: 'clipboard-list',
      route: 'AdminOrders',
    },
    {
      key: 'settings',
      label: 'Settings',
      description: 'Preferences',
      icon: 'cog-outline',
      route: 'AdminSettings',
    },
  ];

  return (
    <AdminScreenBackground>
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text style={styles.badge}>ADMIN PANEL</Text>

            <Text style={styles.welcome}>
              Welcome,
            </Text>

            <Text style={styles.adminName}>
              {user?.fullName || 'Admin'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon
              name="logout"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Dashboard Banner */}

        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerLabel}>
              BrewNest
            </Text>

            <Text style={styles.bannerTitle}>
              Menu Management
            </Text>

            <Text style={styles.bannerText}>
              Manage menu items, categories and availability.
            </Text>
          </View>

          <View style={styles.bannerIcon}>
            <Icon
              name="coffee"
              size={50}
              color={colors.surface}
            />
          </View>
        </View>

        {/* Stats - tappable shortcuts */}

        <Text style={styles.sectionTitle}>
          Overview
        </Text>

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AdminMenu')}
            activeOpacity={0.7}
          >
            <Icon
              name="food"
              size={28}
              color={colors.primary}
            />

            <Text style={styles.statValue}>
              {dashboardStats.totalItems}
            </Text>

            <Text style={styles.statLabel}>
              Menu Items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AdminMenu')}
            activeOpacity={0.7}
          >
            <Icon
              name="check-circle"
              size={28}
              color={colors.success}
            />

            <Text style={styles.statValue}>
              {dashboardStats.availableItems}
            </Text>

            <Text style={styles.statLabel}>
              Available
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AdminMenu')}
            activeOpacity={0.7}
          >
            <Icon
              name="close-circle"
              size={28}
              color={colors.error}
            />

            <Text style={styles.statValue}>
              {dashboardStats.unavailableItems}
            </Text>

            <Text style={styles.statLabel}>
              Out Of Stock
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('AdminCategories')}
            activeOpacity={0.7}
          >
            <Icon
              name="shape"
              size={28}
              color={colors.accent}
            />

            <Text style={styles.statValue}>
              {dashboardStats.categories}
            </Text>

            <Text style={styles.statLabel}>
              Categories
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access Grid */}

        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>

        <View style={styles.gridContainer}>
          {quickAccessItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.gridTile}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.gridIconBox}>
                <Icon
                  name={item.icon}
                  size={26}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.gridLabel}>
                {item.label}
              </Text>

              <Text style={styles.gridDescription} numberOfLines={1}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    </AdminScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  badge: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },

  welcome: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },

  adminName: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
  },

  logoutButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  banner: {
    marginHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bannerLabel: {
    color: colors.secondaryLight,
    fontWeight: '700',
  },

  bannerTitle: {
    color: colors.textWhite,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },

  bannerText: {
    color: colors.secondaryLight,
    marginTop: 6,
    lineHeight: 20,
  },

  bannerIcon: {
    marginLeft: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 8,
  },

  statLabel: {
    color: colors.textSecondary,
    marginTop: 4,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  gridTile: {
    width: '31%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  gridIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  gridLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  gridDescription: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 3,
    textAlign: 'center',
  },
});

export default AdminDashboard;