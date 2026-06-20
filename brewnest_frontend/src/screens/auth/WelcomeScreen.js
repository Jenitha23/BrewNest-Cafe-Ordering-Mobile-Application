import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import CustomButton from '../../components/common/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.screen}>
          <View style={styles.topCircle} />
          <View style={styles.bottomCircle} />

          <View style={styles.leftDecor}>
            <Icon name="leaf-maple" size={54} color="#E2C49F" />
          </View>

          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome to</Text>

            <View style={styles.logoRow}>
              <Text style={styles.logoText}>BrewNest</Text>
              <Text style={styles.beanText}>☕</Text>
            </View>

            <Text style={styles.tagline}>Sip. Smile. Repeat.</Text>
          </View>

          <View style={styles.imageCircle}>
            <Image
              source={require('../../../assets/images/welcome-coffee.png')}
              style={styles.coffeeImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.heroTitle}>Fresh coffee at your fingertips</Text>

            <Text style={styles.heroSubtitle}>
              Order your favourite coffee, snacks,{'\n'}
              and desserts with a smooth{'\n'}
              mobile experience.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Customer Login"
              onPress={() => navigation.navigate('CustomerLogin')}
              type="primary"
              style={styles.loginButton}
              icon={<Icon name="account-outline" size={22} color={colors.textWhite} />}
            />

            <CustomButton
              title="Customer Signup"
              onPress={() => navigation.navigate('CustomerSignup')}
              type="outline"
              style={styles.signupButton}
              icon={<Icon name="account-plus-outline" size={22} color={colors.primary} />}
            />

            <TouchableOpacity
              style={styles.adminLink}
              onPress={() => navigation.navigate('AdminLogin')}
              activeOpacity={0.8}
            >
              <Icon name="shield-check-outline" size={18} color={colors.primary} />
              <Text style={styles.adminText}>Admin Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PHONE_WIDTH = 390;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  screen: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_WIDTH,
    minHeight: 810,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 38 : 34,
    paddingBottom: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  topCircle: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 90,
    backgroundColor: '#E8CBAA',
    top: -55,
    right: -55,
    opacity: 0.85,
  },

  bottomCircle: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: '#EAD6BC',
    bottom: 55,
    left: -120,
    opacity: 0.65,
  },

  leftDecor: {
    position: 'absolute',
    top: 115,
    left: 18,
    opacity: 0.42,
    transform: [{ rotate: '-32deg' }],
  },

  header: {
    alignItems: 'center',
    marginTop: 34,
  },

  welcomeText: {
    fontSize: 14,
    color: colors.primaryLight,
    fontWeight: '600',
    marginBottom: 2,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    fontSize: 43,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -1,
  },

  beanText: {
    fontSize: 20,
    marginLeft: 5,
    marginTop: 4,
  },

  tagline: {
    fontSize: 15,
    color: colors.primaryLight,
    marginTop: 5,
    fontWeight: '500',
  },

  imageCircle: {
    width: 214,
    height: 214,
    borderRadius: 110,
    backgroundColor: '#FFF8EE',
    alignSelf: 'center',
    marginTop: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 13,
  },

  coffeeImage: {
    width: 175,
    height: 175,
  },

  descriptionContainer: {
    alignItems: 'center',
    marginTop: 31,
  },

  heroTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 11,
  },

  heroSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    fontWeight: '500',
  },

  buttonContainer: {
    marginTop: 28,
  },

  loginButton: {
    height: 54,
    borderRadius: 13,
    marginBottom: 13,
    backgroundColor: colors.primary,
  },

  signupButton: {
    height: 54,
    borderRadius: 13,
    marginBottom: 4,
    backgroundColor: 'transparent',
    borderWidth: 1.3,
    borderColor: colors.primary,
  },

  adminLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },

  adminText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
});

export default WelcomeScreen;