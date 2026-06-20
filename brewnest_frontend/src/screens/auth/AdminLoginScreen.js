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

const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const { adminLogin, isLoading, error, clearError } = useContext(AuthContext);

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

    const result = await adminLogin({ email, password });
    
    if (!result.success) {
      Alert.alert('Admin Login Failed', result.error);
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
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.adminIconContainer}>
            <Icon name="shield-crown" size={60} color={colors.secondary} />
          </View>
          <Text style={styles.title}>Admin Portal</Text>
          <Text style={styles.subtitle}>Secure access for administrators</Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Admin Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            placeholder="Enter your admin email"
            keyboardType="email-address"
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

          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <CustomButton
            title="Admin Login"
            onPress={handleLogin}
            type="secondary"
            loading={isLoading}
            style={styles.loginButton}
          />
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
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 8 : 16,
    marginBottom: 16,
    width: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  adminIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.secondaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  loginButton: {
    marginTop: 16,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default AdminLoginScreen;