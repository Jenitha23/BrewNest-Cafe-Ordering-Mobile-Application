import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../theme/colors';
import { CartContext } from '../../context/CartContext';
import { orderApi } from '../../api/orderApi';

const DELIVERY_FEE = 250;

const PaymentScreen = ({ route, navigation }) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    district,
    postalCode,
  } = route.params;

  const { totalAmount, clearCart } =
    useContext(CartContext);

  const [selectedMethod, setSelectedMethod] =
    useState('CASH');

  const subtotal = Number(totalAmount || 0);
  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = async () => {
    try {
      const order = await orderApi.placeOrder({
        paymentMethod: selectedMethod,
        fullName,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        district,
        postalCode,
      });
      

      await clearCart();

      Alert.alert(
  'Success',
  `Order #${order.orderId} placed successfully`,
  [
    {
      text: 'OK',
      onPress: () =>
        navigation.replace('Customer', {
          screen: 'Orders',
          params: {
            screen: 'OrderDetails',
            params: {
              orderId: order.orderId,
            },
          },
        }),
    },
  ]
);
    } catch (error) {
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Failed to place order'
      );
    }
  };

  const PaymentOption = ({
    title,
    subtitle,
    value,
    icon,
  }) => (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        selectedMethod === value &&
          styles.paymentCardSelected,
      ]}
      onPress={() => setSelectedMethod(value)}
    >
      <Icon
        name={icon}
        size={24}
        color={colors.primary}
      />

      <View style={styles.paymentInfo}>
        <Text style={styles.paymentTitle}>
          {title}
        </Text>

        <Text style={styles.paymentSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Icon
        name={
          selectedMethod === value
            ? 'radiobox-marked'
            : 'radiobox-blank'
        }
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.header}>
          Payment
        </Text>

        <Text style={styles.sectionTitle}>
          Order Summary
        </Text>

        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>LKR {subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text>Delivery Fee</Text>
            <Text>LKR {DELIVERY_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              LKR {total.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Payment Method
        </Text>

        <PaymentOption
          title="Cash on Delivery"
          subtitle="Pay when your order is delivered"
          value="CASH"
          icon="cash"
        />

        <PaymentOption
          title="Card Payment"
          subtitle="Pay securely using your card"
          value="CARD"
          icon="credit-card-outline"
        />

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>
            Place Order
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: colors.text,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  totalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primary,
  },

  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  paymentCardSelected: {
    borderColor: colors.primary,
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  paymentSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  placeOrderButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});