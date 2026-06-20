import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import CustomButton from '../../components/common/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070' }}
      style={styles.background}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name="coffee" size={80} color={colors.secondary} />
            <Text style={styles.title}>BrewNest</Text>
            <Text style={styles.tagline}>Your Perfect Brew Awaits</Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Customer Login"
              onPress={() => navigation.navigate('CustomerLogin')}
              type="primary"
              style={styles.button}
              icon={<Icon name="account" size={20} color="white" />}
            />
            
            <CustomButton
              title="Customer Signup"
              onPress={() => navigation.navigate('CustomerSignup')}
              type="outline"
              style={styles.button}
              icon={<Icon name="account-plus" size={20} color={colors.primary} />}
            />

            <TouchableOpacity
              style={styles.adminLink}
              onPress={() => navigation.navigate('AdminLogin')}
            >
              <Icon name="shield-account" size={20} color={colors.textWhite} />
              <Text style={styles.adminText}>Admin Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: 16,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: colors.secondaryLight,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    marginBottom: 16,
  },
  adminLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  adminText: {
    color: colors.textWhite,
    fontSize: 14,
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;