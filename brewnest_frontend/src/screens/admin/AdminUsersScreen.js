import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,  
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminScreenBackground from './AdminScreenBackground';

const AdminUsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data - Replace with API call
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active' },
    { id: 3, name: 'Admin User', email: 'admin@brewnest.com', role: 'Admin', status: 'Active' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminScreenBackground>
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor={colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>New This Month</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Active Admins</Text>
          </View>
        </View>

        <View style={styles.usersList}>
          <Text style={styles.sectionTitle}>All Users</Text>
          {filteredUsers.map((user) => (
            <TouchableOpacity key={user.id} style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={styles.userInitial}>{user.name.charAt(0)}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.userBadges}>
                  <View style={[styles.badge, user.role === 'Admin' ? styles.adminBadge : styles.customerBadge]}>
                    <Text style={styles.badgeText}>{user.role}</Text>
                  </View>
                  <View style={[styles.badge, styles.activeBadge]}>
                    <Text style={styles.badgeText}>{user.status}</Text>
                  </View>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={24} color={colors.textWhite} />
      </TouchableOpacity>
    </SafeAreaView>
    </AdminScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    margin: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  usersList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  userBadges: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  adminBadge: {
    backgroundColor: colors.secondary + '20',
  },
  customerBadge: {
    backgroundColor: colors.primary + '20',
  },
  activeBadge: {
    backgroundColor: colors.success + '20',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default AdminUsersScreen;