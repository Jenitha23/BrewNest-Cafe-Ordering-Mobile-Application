import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../theme/colors';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderCard({
  order,
  onPress,
}) {
  const itemCount =
    order.items?.length || 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Icon
            name="coffee"
            size={28}
            color={colors.primary}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.orderId}>
            Order #{order.orderId}
          </Text>

          <Text style={styles.subText}>
            {itemCount} Item(s)
          </Text>
        </View>

        <OrderStatusBadge
          status={order.status}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.date}>
            {new Date(
              order.orderedAt
            ).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.amount}>
          Rs. {order.totalAmount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#F8E8D4',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  orderId: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  subText: {
    color: colors.textSecondary,
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: 15,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  date: {
    color: colors.textSecondary,
  },

  amount: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
});