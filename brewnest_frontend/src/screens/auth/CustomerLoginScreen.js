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
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { validators } from '../../utils/validators';

const CustomerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
      Alert.alert('Login Failed', result.error || 'Please check your email and password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LoadingSpinner visible={isLoading} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topDecor} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Icon name="chevron-left" size={30} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.logo}>BrewNest</Text>

          <View style={styles.iconContainer}>
            <Icon name="coffee-outline" size={64} color={colors.primary} />
          </View>

          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome back, coffee lover</Text>
        </View>

        <View style={styles.formCard}>
          <CustomInput
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon={<Icon name="email-outline" size={20} color={colors.textLight} />}
            required
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: null });
            }}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            icon={<Icon name="lock-outline" size={20} color={colors.textLight} />}
            required
          />

          <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.8}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <CustomButton
            title="Sign In"
            onPress={handleLogin}
            type="primary"
            loading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CustomerSignup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.bottomCoffee}>☕</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  topDecor: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 120,
    backgroundColor: colors.secondaryLight,
    top: -110,
    right: -90,
    opacity: 0.5,
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 8 : 16,
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 28,
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 22,
  },
  iconContainer: {
    width: 108,
    height: 108,
    borderRadius: 58,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 22,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
  formCard: {
    backgroundColor: '#F8E8D4',
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: -2,
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: '700',
  },
  loginButton: {
    marginTop: 12,
    marginBottom: 22,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '900',
  },
  errorMessage: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  bottomCoffee: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 24,
  },
});

export default CustomerLoginScreen;