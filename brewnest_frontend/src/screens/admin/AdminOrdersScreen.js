import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { orderApi } from '../../api/orderApi';

export default function AdminOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await orderApi.getAllOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.orderId.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('AdminOrderDetails', {
              orderId: item.orderId,
            })
          }
        >
          <Text style={styles.id}>
            Order #{item.orderId}
          </Text>

          <Text>{item.status}</Text>

          <Text>
            Rs. {item.totalAmount}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 3,
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});