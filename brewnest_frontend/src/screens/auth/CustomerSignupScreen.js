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
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        [
          {
            text: 'Login',
            onPress: () => navigation.navigate('CustomerLogin'),
          },
        ]
      );
    } else {
      Alert.alert(
        'Signup Failed',
        result.error || 'Please check your details and try again.'
      );
    }
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
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
              <Icon name="account-plus-outline" size={48} color={colors.primary} />
            </View>

            <View style={styles.leafDecor}>
              <Icon name="leaf" size={26} color="#E2C49F" />
              <Icon
                name="leaf"
                size={22}
                color="#E2C49F"
                style={styles.leafSmall}
              />
            </View>

            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create your coffee account</Text>

            <View style={styles.formCard}>
              <Text style={styles.label}>Full Name</Text>

              <View style={[styles.inputBox, errors.fullName && styles.inputError]}>
                <Icon name="account-outline" size={19} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textLight}
                  value={formData.fullName}
                  onChangeText={(text) => updateField('fullName', text)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
              </View>

              {errors.fullName ? (
                <Text style={styles.validationText}>{errors.fullName}</Text>
              ) : null}

              <Text style={[styles.label, styles.fieldLabel]}>Email Address</Text>

              <View style={[styles.inputBox, errors.email && styles.inputError]}>
                <Icon name="email-outline" size={19} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textLight}
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
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

              <Text style={[styles.label, styles.fieldLabel]}>
                Phone Number <Text style={styles.optionalText}>(Optional)</Text>
              </Text>

              <View style={[styles.inputBox, errors.phoneNumber && styles.inputError]}>
                <Icon name="phone-outline" size={19} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor={colors.textLight}
                  value={formData.phoneNumber}
                  onChangeText={(text) => updateField('phoneNumber', text)}
                  keyboardType="phone-pad"
                  autoCorrect={false}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
              </View>

              {errors.phoneNumber ? (
                <Text style={styles.validationText}>{errors.phoneNumber}</Text>
              ) : null}

              <Text style={[styles.label, styles.fieldLabel]}>Password</Text>

              <View style={[styles.inputBox, errors.password && styles.inputError]}>
                <Icon name="lock-outline" size={19} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor={colors.textLight}
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
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
                    size={19}
                    color={colors.primaryLight}
                  />
                </TouchableOpacity>
              </View>

              {errors.password ? (
                <Text style={styles.validationText}>{errors.password}</Text>
              ) : null}

              <Text style={[styles.label, styles.fieldLabel]}>Confirm Password</Text>

              <View style={[styles.inputBox, errors.confirmPassword && styles.inputError]}>
                <Icon name="lock-check-outline" size={19} color={colors.primaryLight} />

                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.textLight}
                  value={formData.confirmPassword}
                  onChangeText={(text) => updateField('confirmPassword', text)}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />

                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.8}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color={colors.primaryLight}
                  />
                </TouchableOpacity>
              </View>

              {errors.confirmPassword ? (
                <Text style={styles.validationText}>{errors.confirmPassword}</Text>
              ) : null}

              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignup}
                activeOpacity={0.85}
                disabled={isLoading}
              >
                <Text style={styles.signUpText}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>

              <TouchableOpacity onPress={() => navigation.navigate('CustomerLogin')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomLeaf}>
              <Icon name="leaf-maple" size={27} color={colors.secondary} />
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
    paddingTop: Platform.OS === 'android' ? 14 : 18,
    paddingBottom: 28,
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
    top: Platform.OS === 'android' ? 30 : 30,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
    fontStyle: 'italic',
  },

  iconCircle: {
    width: 86,
    height: 86,
    borderRadius: 46,
    backgroundColor: '#F8E8D4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },

  leafDecor: {
    position: 'absolute',
    top: 135,
    right: 30,
    opacity: 0.38,
    transform: [{ rotate: '-24deg' }],
  },

  leafSmall: {
    marginLeft: 15,
    marginTop: -5,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 14,
  },

  formCard: {
    backgroundColor: '#F8E8D4',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
  },

  fieldLabel: {
    marginTop: 8,
  },

  optionalText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },

  inputBox: {
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFF9F1',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  inputError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    fontSize: 13,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },

  validationText: {
    fontSize: 10,
    color: colors.error,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: '600',
  },

  errorMessage: {
    color: colors.error,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },

  signUpButton: {
    height: 50,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },

  signUpText: {
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '900',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  loginText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },

  loginLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
  },

  bottomLeaf: {
    alignItems: 'center',
    marginTop: 34,
    opacity: 0.7,
  },
});

export default CustomerSignupScreen;