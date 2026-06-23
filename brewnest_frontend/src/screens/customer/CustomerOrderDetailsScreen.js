import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

import { orderApi } from '../../api/orderApi';

export default function CustomerOrderDetailsScreen({
  route,
  navigation,
}) {
  const { orderId } = route.params;

  const [order, setOrder] = useState(null);

  const loadOrder = async () => {
    const data = await orderApi.getOrder(orderId);
    setOrder(data);
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const cancelOrder = async () => {
    try {
      await orderApi.cancelOrder(orderId);

      Alert.alert('Success', 'Order cancelled');

      loadOrder();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (!order) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Order #{order.orderId}
      </Text>

      <Text>Status: {order.status}</Text>
      <Text>Payment: {order.paymentMethod}</Text>

      <Text style={styles.section}>Items</Text>

      {order.items.map(item => (
        <View key={item.menuItemId} style={styles.item}>
          <Text>{item.name}</Text>
          <Text>x{item.quantity}</Text>
          <Text>Rs.{item.subtotal}</Text>
        </View>
      ))}

      <Text style={styles.total}>
        Total: Rs.{order.totalAmount}
      </Text>

      {order.status === 'PENDING' && (
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={cancelOrder}
        >
          <Text style={styles.btnText}>
            Cancel Order
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  total: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelBtn: {
    marginTop: 30,
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});