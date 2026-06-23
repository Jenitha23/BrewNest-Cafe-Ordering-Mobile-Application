import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_COLORS = {
  PENDING: '#F59E0B',
  PREPARING: '#3B82F6',
  READY: '#10B981',
  COMPLETED: '#166534',
  CANCELLED: '#DC2626',
};

export default function OrderStatusBadge({ status }) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor:
            STATUS_COLORS[status] || '#999',
        },
      ]}
    >
      <Text style={styles.text}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});