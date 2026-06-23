import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { orderApi } from '../../api/orderApi';

const statusColors = {
  PENDING: '#F59E0B',
  PREPARING: '#3B82F6',
  READY: '#10B981',
  COMPLETED: '#166534',
  CANCELLED: '#DC2626',
};

export default function CustomerOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await orderApi.getMyOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={orders}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadOrders} />
      }
      keyExtractor={(item) => item.orderId.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('OrderDetails', {
              orderId: item.orderId,
            })
          }
        >
          <Text style={styles.orderId}>Order #{item.orderId}</Text>

          <View
            style={[
              styles.badge,
              { backgroundColor: statusColors[item.status] },
            ]}
          >
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>

          <Text style={styles.total}>
            Rs. {item.totalAmount}
          </Text>

          <Text style={styles.date}>
            {new Date(item.orderedAt).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
  },
  total: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    marginTop: 5,
    color: '#666',
  },
});