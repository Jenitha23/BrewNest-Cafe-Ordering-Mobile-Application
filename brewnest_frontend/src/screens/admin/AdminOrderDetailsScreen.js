import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { orderApi } from '../../api/orderApi';

export default function AdminOrderDetailsScreen({
  route,
}) {
  const { orderId } = route.params;

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  const loadOrder = async () => {
    const data = await orderApi.getOrder(orderId);

    setOrder(data);
    setStatus(data.status);
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const updateStatus = async () => {
    try {
      await orderApi.updateStatus(
        orderId,
        status
      );

      Alert.alert(
        'Success',
        'Status updated'
      );

      loadOrder();
    } catch (error) {
      Alert.alert(
        'Error',
        error.message
      );
    }
  };

  if (!order) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Order #{order.orderId}
      </Text>

      <Text>
        Payment: {order.paymentMethod}
      </Text>

      <Text>
        Total: Rs.{order.totalAmount}
      </Text>

      <Text style={styles.section}>
        Order Status
      </Text>

      <Picker
        selectedValue={status}
        onValueChange={setStatus}
      >
        <Picker.Item
          label="PENDING"
          value="PENDING"
        />
        <Picker.Item
          label="PREPARING"
          value="PREPARING"
        />
        <Picker.Item
          label="READY"
          value="READY"
        />
        <Picker.Item
          label="COMPLETED"
          value="COMPLETED"
        />
        <Picker.Item
          label="CANCELLED"
          value="CANCELLED"
        />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={updateStatus}
      >
        <Text style={styles.buttonText}>
          Update Status
        </Text>
      </TouchableOpacity>

      <Text style={styles.section}>
        Items
      </Text>

      {order.items.map(item => (
        <View
          key={item.menuItemId}
          style={styles.item}
        >
          <Text>{item.name}</Text>
          <Text>x{item.quantity}</Text>
        </View>
      ))}
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
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#6F4E37',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});