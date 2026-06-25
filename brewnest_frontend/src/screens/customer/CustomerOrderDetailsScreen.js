import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { orderApi } from '../../api/orderApi';

const CustomerOrderDetailsScreen = ({ route, navigation }) => {
  const { orderId } = route.params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const data = await orderApi.getOrder(orderId);
      setOrder(data);
    } catch (error) {
      console.log('Load Order Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    switch (order?.status) {
      case 'PENDING':
        return 1;
      case 'PREPARING':
        return 2;
      case 'READY':
        return 3;
      case 'COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7B4F36" />
      </View>
    );
  }

  const currentStep = getStep();

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color="#3E2723" />
            </TouchableOpacity>

            <Text style={styles.brandName}>Brewnest Cafe</Text>

            <View style={{ width: 24 }} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Thank you for order!</Text>

          {/* Order Number Card */}
          <View style={styles.orderNumberCard}>
            <Text style={styles.orderNumberLabel}>Order number</Text>
            <View style={styles.orderBadge}>
              <Text style={styles.orderBadgeText}>{order.orderId}</Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.infoRow}>
  <Text style={styles.infoLabel}>
    Payment Status
  </Text>

  <Text
    style={[
      styles.infoValue,
      {
        color:
          order.paymentStatus === 'PAID'
            ? 'green'
            : 'orange',
      },
    ]}
  >
    {order.paymentStatus}
  </Text>
</View>

          {/* Total Amount */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Amount</Text>
            <Text style={styles.infoValue}>Rs. {order.totalAmount}</Text>
          </View>

          {/* Tracking */}
          <Text style={styles.trackingTitle}>Order tracking</Text>

          <View style={styles.timelineContainer}>
            <TimelineItem
              title="Order placed"
              active={currentStep >= 1}
              showLine={true}
            />
            <TimelineItem
              title="Preparing"
              active={currentStep >= 2}
              showLine={true}
            />
            <TimelineItem
              title="Order is ready"
              active={currentStep >= 3}
              showLine={true}
            />
            <TimelineItem
              title="Completed"
              active={currentStep >= 4}
              showLine={false}
            />
          </View>

          {/* Home Button */}
          {/* Back Home */}
<TouchableOpacity
  style={styles.homeButton}
  onPress={() => navigation.navigate('Home')}
>
  <Text style={styles.homeButtonText}>Back Home</Text>
</TouchableOpacity>

{/* Order History */}
<TouchableOpacity
  style={styles.historyButton}
  onPress={() =>
    navigation.navigate('Orders', {
      screen: 'CustomerOrders',
    })
  }
>
  <Text style={styles.historyButtonText}>
    View Order History
  </Text>
</TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const TimelineItem = ({ title, active, showLine }) => {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLeft}>
        <View
          style={[
            styles.circle,
            active && styles.activeCircle,
          ]}
        />
        {showLine && (
          <View
            style={[
              styles.line,
              active && styles.activeLine,
            ]}
          />
        )}
      </View>

      <Text
        style={[
          styles.timelineText,
          active && styles.activeText,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default CustomerOrderDetailsScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },

  backButton: {
    padding: 4,
  },

  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3E2723',
    fontStyle: 'italic',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1F1B',
    marginBottom: 12,
  },

  orderNumberCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  orderNumberLabel: {
    fontSize: 15,
    color: '#9B8A7A',
    fontWeight: '500',
  },

  orderBadge: {
    backgroundColor: '#3E2723',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  orderBadgeText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 14,
    color: '#9B8A7A',
    fontWeight: '500',
  },

  infoValue: {
    fontSize: 14,
    color: '#3E2723',
    fontWeight: '700',
  },

  trackingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    marginTop: 16,
    marginBottom: 16,
  },

  timelineContainer: {
    paddingLeft: 4,
  },

  timelineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#C8A27B',
    backgroundColor: 'transparent',
  },

  activeCircle: {
    backgroundColor: '#7B4F36',
    borderColor: '#7B4F36',
  },

  line: {
    width: 2,
    height: 38,
    backgroundColor: '#D8C2AE',
    marginTop: 2,
  },

  activeLine: {
    backgroundColor: '#7B4F36',
  },

  timelineText: {
    fontSize: 15,
    color: '#B0A090',
    fontWeight: '500',
    marginTop: -1,
  },

  activeText: {
    color: '#2D1F1B',
    fontWeight: '700',
  },

  homeButton: {
    marginTop: 30,
    backgroundColor: '#3E2723',
    height: 54,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  historyButton: {
  marginTop: 12,
  height: 54,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: '#3E2723',
  backgroundColor: 'rgba(255,255,255,0.85)',
},

historyButtonText: {
  color: '#3E2723',
  fontSize: 16,
  fontWeight: '800',
  letterSpacing: 0.3,
},
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});