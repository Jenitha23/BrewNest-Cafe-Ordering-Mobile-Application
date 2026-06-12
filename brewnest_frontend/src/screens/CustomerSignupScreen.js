// src/screens/CustomerSignupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { authService } from '../services/authService';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const CustomerSignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) 
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await authService.customerSignup(formData);
      if (response.success) {
        Alert.alert(
          'Success',
          'Account created successfully! Please login.',
          [{ text: 'OK', onPress: () => navigation.navigate('CustomerLogin') }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join BrewNest today!</Text>
      </View>

      <View style={styles.form}>
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          error={errors.fullName}
        />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          error={errors.password}
        />

        <CustomInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
          error={errors.phoneNumber}
        />

        <CustomButton
          title={loading ? "Creating Account..." : "Sign Up"}
          onPress={handleSignup}
          disabled={loading}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CustomerLogin')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6F4E37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0826A',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#A0826A',
    fontSize: 14,
  },
  loginLink: {
    color: '#6F4E37',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CustomerSignupScreen;