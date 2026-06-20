import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { CartContext } from '../../context/CartContext';
import { getImageUrl } from '../../api/menuApi';

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const handleCheckout = () => {
    Alert.alert('Next Feature', 'Checkout and order placement will be implemented next.');
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;

    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearCart,
        },
      ]
    );
  };

  const handleBrowseMenu = () => {
    navigation.navigate('Menu');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.title}>My Cart</Text>

          <TouchableOpacity onPress={handleClearCart}>
            <Icon name="trash-can-outline" size={25} color={colors.error} />
          </TouchableOpacity>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Icon name="cart-outline" size={78} color={colors.textLight} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>Add some cafe items to continue.</Text>

            <TouchableOpacity
              style={styles.browseButton}
              onPress={handleBrowseMenu}
              activeOpacity={0.85}
            >
              <Text style={styles.browseText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.imageBox}>
                  {item.imageUrl ? (
                    <Image source={{ uri: getImageUrl(item.imageUrl) }} style={styles.image} />
                  ) : (
                    <Icon name="coffee-to-go" size={38} color={colors.secondary} />
                  )}
                </View>

                <View style={styles.itemContent}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemCategory} numberOfLines={1}>
                    {item.categoryName || 'Cafe Item'}
                  </Text>

                  <Text style={styles.itemPrice}>
                    Rs. {Number(item.price || 0).toFixed(0)}
                  </Text>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => decreaseQuantity(item.id)}
                      activeOpacity={0.8}
                    >
                      <Icon name="minus" size={16} color={colors.primary} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => increaseQuantity(item.id)}
                      activeOpacity={0.8}
                    >
                      <Icon name="plus" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Icon name="close-circle" size={24} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>Rs. {totalAmount.toFixed(0)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>Rs. 0</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rs. {totalAmount.toFixed(0)}</Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const PHONE_WIDTH = 430;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 42 : 16,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  title: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },

  emptyTitle: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: '900',
    marginTop: 20,
  },

  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
  },

  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 34,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 30,
  },

  browseText: {
    color: colors.textWhite,
    fontWeight: '900',
    fontSize: 16,
  },

  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },

  cartItem: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageBox: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: '#F8E8D4',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  itemContent: {
    flex: 1,
    marginLeft: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  itemCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '900',
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8E8D4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantity: {
    marginHorizontal: 13,
    fontSize: 14,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  summaryBox: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 18,
    marginBottom: 12,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },

  summaryValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '900',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 17,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  totalValue: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '900',
  },

  checkoutButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  checkoutText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default CartScreen;