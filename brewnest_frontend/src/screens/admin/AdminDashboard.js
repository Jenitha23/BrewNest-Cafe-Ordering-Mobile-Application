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

  return (
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

        {/* Stats */}

        <Text style={styles.sectionTitle}>
          Overview
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
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
          </View>

          <View style={styles.statCard}>
            <Icon
              name="check-circle"
              size={28}
              color="#2E7D32"
            />

            <Text style={styles.statValue}>
              {dashboardStats.availableItems}
            </Text>

            <Text style={styles.statLabel}>
              Available
            </Text>
          </View>

          <View style={styles.statCard}>
            <Icon
              name="close-circle"
              size={28}
              color="#D32F2F"
            />

            <Text style={styles.statValue}>
              {dashboardStats.unavailableItems}
            </Text>

            <Text style={styles.statLabel}>
              Out Of Stock
            </Text>
          </View>

          <View style={styles.statCard}>
            <Icon
              name="shape"
              size={28}
              color="#6A1B9A"
            />

            <Text style={styles.statValue}>
              {dashboardStats.categories}
            </Text>

            <Text style={styles.statLabel}>
              Categories
            </Text>
          </View>
        </View>
        <TouchableOpacity
  style={styles.menuCard}
  onPress={() => navigation.navigate('AdminOrders')}
>
  <View style={styles.iconBox}>
    <Icon
      name="clipboard-list"
      size={30}
      color={colors.primary}
    />
  </View>

  <View style={styles.cardContent}>
    <Text style={styles.cardTitle}>
      Order Management
    </Text>

    <Text style={styles.cardDescription}>
      View and update customer orders
    </Text>
  </View>

  <Icon
    name="chevron-right"
    size={24}
    color={colors.textLight}
  />
</TouchableOpacity>

        {/* Management */}

        <Text style={styles.sectionTitle}>
          Management
        </Text>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('AdminMenu')}
        >
          <View style={styles.iconBox}>
            <Icon
              name="food"
              size={30}
              color={colors.primary}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Menu Management
            </Text>

            <Text style={styles.cardDescription}>
              Add, update and delete menu items
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={24}
            color={colors.textLight}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('AdminCategories')}
        >
          <View style={styles.iconBox}>
            <Icon
              name="shape"
              size={30}
              color={colors.primary}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Category Management
            </Text>

            <Text style={styles.cardDescription}>
              Create and manage categories
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={24}
            color={colors.textLight}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('AdminMenu')}
        >
          <View style={styles.iconBox}>
            <Icon
              name="toggle-switch"
              size={30}
              color={colors.primary}
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Availability Control
            </Text>

            <Text style={styles.cardDescription}>
              Manage stock availability
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={24}
            color={colors.textLight}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: '#F5D8BC',
    fontWeight: '700',
  },

  bannerTitle: {
    color: colors.textWhite,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },

  bannerText: {
    color: '#F7E8DA',
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

  menuCard: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#F8E8D4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  cardDescription: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default AdminDashboard;