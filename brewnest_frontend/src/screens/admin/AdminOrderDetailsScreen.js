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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { orderApi } from '../../api/orderApi';
import AdminScreenBackground from './AdminScreenBackground';

export default function AdminOrderDetailsScreen({
  navigation,
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
    <AdminScreenBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Details</Text>

          <View style={{ width: 42 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>
              Order #{order.orderId}
            </Text>

            <View style={styles.infoRow}>
              <Icon name="credit-card-outline" size={18} color={colors.primaryLight} />
              <Text style={styles.infoText}>Payment: {order.paymentMethod}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="cash" size={18} color={colors.primaryLight} />
              <Text style={styles.infoText}>Total: Rs. {order.totalAmount}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.section}>
              Order Status
            </Text>

            <View style={styles.pickerBox}>
              <Picker
                selectedValue={status}
                onValueChange={setStatus}
                style={styles.picker}
              >
                <Picker.Item label="PENDING" value="PENDING" />
                <Picker.Item label="PREPARING" value="PREPARING" />
                <Picker.Item label="READY" value="READY" />
                <Picker.Item label="COMPLETED" value="COMPLETED" />
                <Picker.Item label="CANCELLED" value="CANCELLED" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={updateStatus}
            >
              <Text style={styles.buttonText}>
                Update Status
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.section}>
              Items
            </Text>

            {order.items.map(item => (
              <View
                key={item.menuItemId}
                style={styles.item}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 21,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  container: {
    padding: 18,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  infoText: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },

  section: {
    fontWeight: '900',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },

  picker: {
    color: colors.textPrimary,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  itemName: {
    color: colors.textPrimary,
    fontWeight: '700',
  },

  itemQty: {
    color: colors.textSecondary,
    fontWeight: '700',
  },

  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
  },

  buttonText: {
    color: colors.textWhite,
    textAlign: 'center',
    fontWeight: '900',
  },
});