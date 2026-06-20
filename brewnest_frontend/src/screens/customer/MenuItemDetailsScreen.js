import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { getImageUrl, menuApi } from '../../api/menuApi';
import { CartContext } from '../../context/CartContext';

const MenuItemDetailsScreen = ({ navigation, route }) => {
  const { itemId } = route.params;

  const cart = useContext(CartContext);

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadItem = async () => {
    try {
      setLoading(true);
      const data = await menuApi.getCustomerMenuItemById(itemId);
      setItem(data);
    } catch (error) {
      Alert.alert('Error', 'Unable to load item details.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItem();
  }, [itemId]);

  const handleAddToCart = () => {
    if (!item) return;

    cart?.addToCart(item, quantity);
    Alert.alert('Added to Cart', `${quantity} x ${item.name} added to your cart.`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 80 }} />
      </SafeAreaView>
    );
  }

  if (!item) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.imageBox}>
            {item.imageUrl ? (
              <Image source={{ uri: getImageUrl(item.imageUrl) }} style={styles.image} />
            ) : (
              <Icon name="coffee-to-go" size={96} color={colors.secondary} />
            )}
          </View>

          <View style={styles.contentCard}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.categoryName}</Text>
            </View>

            <Text style={styles.title}>{item.name}</Text>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.status}>Available</Text>
              <Text style={styles.price}>Rs. {Number(item.price || 0).toFixed(0)}</Text>
            </View>

            <View style={styles.quantityRow}>
              <Text style={styles.quantityLabel}>Quantity</Text>

              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  <Icon name="minus" size={18} color={colors.primary} />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Icon name="plus" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Icon name="cart-plus" size={21} color={colors.textWhite} />
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    padding: 18,
    paddingTop: Platform.OS === 'android' ? 20 : 12,
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

  imageBox: {
    height: 270,
    borderRadius: 32,
    backgroundColor: '#F8E8D4',
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.transparentBrown,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  categoryText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '900',
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 16,
  },

  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 10,
  },

  infoRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '900',
  },

  price: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '900',
  },

  quantityRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quantityLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8E8D4',
    borderRadius: 16,
    padding: 6,
  },

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 17,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    marginHorizontal: 18,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  addButton: {
    marginTop: 28,
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  addButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 8,
  },
});

export default MenuItemDetailsScreen;