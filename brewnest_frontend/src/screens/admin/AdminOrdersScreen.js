import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { orderApi } from '../../api/orderApi';
import AdminScreenBackground from './AdminScreenBackground';

const getStatusStyle = (status) => {
  if (status === 'COMPLETED') return styles.completedBadge;
  if (status === 'CANCELLED') return styles.cancelledBadge;
  if (status === 'READY') return styles.readyBadge;
  if (status === 'PREPARING') return styles.preparingBadge;
  return styles.pendingBadge;
};

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
    <AdminScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>Admin Side</Text>
            <Text style={styles.title}>Orders</Text>
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={loadOrders}>
            <Icon name="refresh" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          contentContainerStyle={{ padding: 18, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('AdminOrderDetails', {
                  orderId: item.orderId,
                })
              }
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.id}>
                  Order #{item.orderId}
                </Text>

                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBottomRow}>
                <Text style={styles.amount}>
                  Rs. {item.totalAmount}
                </Text>

                <Icon name="chevron-right" size={22} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </AdminScreenBackground>
  );
}

const PHONE_WIDTH = 460;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: PHONE_WIDTH,
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  smallTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },

  title: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 3,
  },

  refreshButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  id: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  amount: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.primary,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  pendingBadge: {
    backgroundColor: '#FBE9D0',
  },

  preparingBadge: {
    backgroundColor: colors.secondaryLight,
  },

  readyBadge: {
    backgroundColor: '#DCEAFB',
  },

  completedBadge: {
    backgroundColor: '#E4F4E6',
  },

  cancelledBadge: {
    backgroundColor: '#FBE3DF',
  },
});