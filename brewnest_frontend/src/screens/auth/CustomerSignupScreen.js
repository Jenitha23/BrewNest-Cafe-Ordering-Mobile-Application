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

const CustomerSignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  const { customerSignup, isLoading, error, clearError } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};

    const nameError = validators.validateFullName(formData.fullName);
    const emailError = validators.validateEmail(formData.email);
    const passwordError = validators.validatePassword(formData.password);
    const phoneError = validators.validatePhoneNumber(formData.phoneNumber);

    if (nameError) newErrors.fullName = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (phoneError) newErrors.phoneNumber = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    clearError();

    if (!validateForm()) return;

    const { confirmPassword, ...signupData } = formData;
    const result = await customerSignup(signupData);

    if (result.success) {
      Alert.alert(
        'Success!',
        'Account created successfully. Welcome to BrewNest!',
        [{ text: 'Login', onPress: () => navigation.navigate('CustomerLogin') }]
      );
    } else {
      Alert.alert('Signup Failed', result.error || 'Please check your details and try again.');
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
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
            <Icon name="account-plus-outline" size={64} color={colors.primary} />
          </View>

          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create your coffee account</Text>
        </View>

        <View style={styles.formCard}>
          <CustomInput
            label="Full Name"
            value={formData.fullName}
            onChangeText={(text) => updateField('fullName', text)}
            placeholder="Enter your full name"
            error={errors.fullName}
            icon={<Icon name="account-outline" size={20} color={colors.textLight} />}
            required
          />

          <CustomInput
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            icon={<Icon name="email-outline" size={20} color={colors.textLight} />}
            required
          />

          <CustomInput
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => updateField('phoneNumber', text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            error={errors.phoneNumber}
            icon={<Icon name="phone-outline" size={20} color={colors.textLight} />}
          />

          <CustomInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
            icon={<Icon name="lock-outline" size={20} color={colors.textLight} />}
            required
          />

          <CustomInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
            icon={<Icon name="lock-check-outline" size={20} color={colors.textLight} />}
            required
          />

          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <CustomButton
            title="Sign Up"
            onPress={handleSignup}
            type="primary"
            loading={isLoading}
            style={styles.signupButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CustomerLogin')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 34,
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
    marginTop: 12,
    marginBottom: 24,
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 18,
  },
  iconContainer: {
    width: 102,
    height: 102,
    borderRadius: 56,
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
    marginTop: 18,
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
  signupButton: {
    marginTop: 12,
    marginBottom: 22,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginLink: {
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
});

export default CustomerSignupScreen;