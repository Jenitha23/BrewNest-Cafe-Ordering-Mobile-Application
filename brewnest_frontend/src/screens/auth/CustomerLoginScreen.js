import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { validators } from '../../utils/validators';

const CustomerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { customerLogin, isLoading, error, clearError } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};

    const emailError = validators.validateEmail(email);
    const passwordError = validators.validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    clearError();

    if (!validateForm()) return;

    const result = await customerLogin({ email, password });

    if (!result.success) {
      Alert.alert(
        'Login Failed',
        result.error || 'Please check your email and password.'
      );
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LoadingSpinner visible={isLoading} />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.screen}>
            <View style={styles.topCircle} />

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Icon name="chevron-left" size={25} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.logoText}>BrewNest</Text>

            <View style={styles.iconCircle}>
              <Image
                source={require('../../../assets/images/minimalist_coffee_cup_icon.png')}
                style={styles.coffeeIconImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.leafDecor}>
              <Icon name="leaf" size={28} color="#E2C49F" />
              <Icon
                name="leaf"
                size={24}
                color="#E2C49F"
                style={styles.leafSmall}
              />
            </View>

            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Welcome back, coffee lover</Text>

            <View style={styles.formCard}>
              <Text style={styles.label}>Email Address</Text>

              <View style={[styles.inputBox, errors.email && styles.inputError]}>
                <Icon name="email-outline" size={20} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textLight}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({ ...errors, email: null });
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
              </View>

              {errors.email ? (
                <Text style={styles.validationText}>{errors.email}</Text>
              ) : null}

              <Text style={[styles.label, styles.passwordLabel]}>Password</Text>

              <View style={[styles.inputBox, errors.password && styles.inputError]}>
                <Icon name="lock-outline" size={20} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textLight}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors({ ...errors, password: null });
                    }
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.8}
                >
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.primaryLight}
                  />
                </TouchableOpacity>
              </View>

              {errors.password ? (
                <Text style={styles.validationText}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.8}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleLogin}
                activeOpacity={0.85}
                disabled={isLoading}
              >
                <Text style={styles.signInText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don’t have an account? </Text>

              <TouchableOpacity onPress={() => navigation.navigate('CustomerSignup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomLeaf}>
              <Icon name="leaf-maple" size={28} color={colors.secondary} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const PHONE_WIDTH = 390;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardView: {
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
    minHeight: 790,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'android' ? 18 : 18,
    paddingBottom: 24,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  topCircle: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 90,
    backgroundColor: '#E8CBAA',
    top: -70,
    right: -65,
    opacity: 0.52,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFF4E4',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  logoText: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 34 : 30,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    fontStyle: 'italic',
  },

  iconCircle: {
    width: 102,
    height: 102,
    borderRadius: 54,
    backgroundColor: '#FFF8EE',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    overflow: 'hidden',
  },

  coffeeIconImage: {
    width: 92,
    height: 92,
  },

  leafDecor: {
    position: 'absolute',
    top: 142,
    right: 30,
    opacity: 0.38,
    transform: [{ rotate: '-24deg' }],
  },

  leafSmall: {
    marginLeft: 16,
    marginTop: -4,
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 27,
  },

  formCard: {
    backgroundColor: '#F8E8D4',
    borderRadius: 18,
    paddingHorizontal: 17,
    paddingTop: 18,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 9,
  },

  passwordLabel: {
    marginTop: 14,
  },

  inputBox: {
    height: 54,
    borderRadius: 11,
    backgroundColor: '#FFF9F1',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  inputError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    height: '100%',
    marginLeft: 11,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },

  validationText: {
    fontSize: 11,
    color: colors.error,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: '600',
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },

  forgotText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },

  errorMessage: {
    color: colors.error,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },

  signInButton: {
    height: 58,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  signInText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '900',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  signupText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },

  signupLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },

  bottomLeaf: {
    alignItems: 'center',
    marginTop: 82,
    opacity: 0.7,
  },
});

export default CustomerLoginScreen;