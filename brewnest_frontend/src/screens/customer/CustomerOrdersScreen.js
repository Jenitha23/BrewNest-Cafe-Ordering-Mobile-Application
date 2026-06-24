import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { orderApi } from '../../api/orderApi';

const statusColors = {
  PENDING: '#C8860A',
  PREPARING: '#4A7FA5',
  READY: '#4A7A5A',
  COMPLETED: '#3E6B3E',
  CANCELLED: '#A63228',
};

const statusBgColors = {
  PENDING: '#FEF3C7',
  PREPARING: '#DBEAFE',
  READY: '#D1FAE5',
  COMPLETED: '#DCFCE7',
  CANCELLED: '#FEE2E2',
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
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7B4F36" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>Brewnest Cafe</Text>
        </View>

        <Text style={styles.pageTitle}>My Orders</Text>

        <FlatList
          data={orders}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadOrders} />
          }
          keyExtractor={(item) => item.orderId.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('OrderDetails', {
                  orderId: item.orderId,
                })
              }
            >
              <View style={styles.cardTop}>
                <Text style={styles.orderId}>Order #{item.orderId}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: statusBgColors[item.status] },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: statusColors[item.status] },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardBottom}>
                <Text style={styles.total}>Rs. {item.totalAmount}</Text>
                <Text style={styles.date}>
                  {new Date(item.orderedAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5ECD9',
  },

  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },

  brandName: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#3E2723',
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2D1F1B',
    marginBottom: 16,
    marginTop: 8,
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2D1F1B',
  },

  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.07)',
    marginVertical: 10,
  },

  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  total: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3E2723',
  },

  date: {
    fontSize: 13,
    color: '#9B8A7A',
    fontWeight: '500',
  },
});