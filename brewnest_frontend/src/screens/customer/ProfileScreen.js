import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const user = auth?.user || auth?.customer || auth?.userData;

  const getCleanDisplayName = () => {
    const rawName =
      user?.fullName ||
      user?.name ||
      user?.customerName ||
      user?.email?.split('@')[0] ||
      'Coffee Lover';

    const words = String(rawName).trim().split(/\s+/);

    if (words.length >= 6) {
      const half = Math.floor(words.length / 2);
      const firstHalf = words.slice(0, half).join(' ');
      const secondHalf = words.slice(half).join(' ');

      if (firstHalf === secondHalf) {
        return firstHalf;
      }
    }

    return rawName;
  };

  const displayName = getCleanDisplayName();
  const displayEmail = user?.email || 'No email available';
  const displayPhone = user?.phoneNumber || user?.phone || 'No phone number';

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
          style: 'destructive',
          onPress: async () => {
            if (auth?.logout) {
              await auth.logout();
            } else if (auth?.signOut) {
              await auth.signOut();
            } else {
              Alert.alert('Error', 'Logout function not found in AuthContext.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your BrewNest account</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatarCircle}>
              <Icon name="account" size={58} color={colors.textWhite} />
            </View>

            <Text style={styles.name} numberOfLines={2}>
              {displayName}
            </Text>

            <Text style={styles.email} numberOfLines={1}>
              {displayEmail}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon name="email-outline" size={22} color={colors.primary} />

              <View style={styles.infoTextBox}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue} numberOfLines={1}>
                  {displayEmail}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon name="phone-outline" size={22} color={colors.primary} />

              <View style={styles.infoTextBox}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{displayPhone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => navigation.navigate('Settings')}
              activeOpacity={0.8}
            >
              <View style={styles.menuLeft}>
                <Icon name="cog-outline" size={22} color={colors.primary} />
                <Text style={styles.menuText}>Settings</Text>
              </View>

              <Icon name="chevron-right" size={24} color={colors.textLight} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => navigation.navigate('Cart')}
              activeOpacity={0.8}
            >
              <View style={styles.menuLeft}>
                <Icon name="cart-outline" size={22} color={colors.primary} />
                <Text style={styles.menuText}>My Cart</Text>
              </View>

              <Icon name="chevron-right" size={24} color={colors.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Icon name="logout" size={22} color={colors.textWhite} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const PHONE_WIDTH = 430;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 42 : 16,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatarCircle: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  name: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },

  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 7,
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  infoTextBox: {
    marginLeft: 12,
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '700',
  },

  infoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '800',
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  menuRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '800',
    marginLeft: 12,
  },

  logoutButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 26,
    marginBottom: 10,
  },

  logoutText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 8,
  },
});

export default ProfileScreen;