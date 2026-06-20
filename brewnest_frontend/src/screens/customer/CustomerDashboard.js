import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import BrewCard from '../../components/cards/BrewCard';
import { menuApi } from '../../api/menuApi';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const CustomerDashboard = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const user = auth?.user || auth?.customer || auth?.userData;

  const displayName =
    user?.fullName || user?.name || user?.email?.split('@')[0] || 'Coffee Lover';

  const loadCategories = async () => {
    const data = await menuApi.getCustomerCategories();
    setCategories(data || []);
  };

  const loadMenuItems = async () => {
    const data = await menuApi.getCustomerMenuItems({
      categoryId: selectedCategoryId,
      search,
    });

    setMenuItems(data || []);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await loadCategories();
      await loadMenuItems();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Unable to load menu items.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setRefreshing(true);
      await loadCategories();
      await loadMenuItems();
    } catch (error) {
      Alert.alert('Error', 'Unable to refresh menu.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadMenuItems().catch((error) => {
      console.log(error.response?.data || error.message);
    });
  }, [selectedCategoryId]);

  const handleSearch = () => {
    loadMenuItems().catch(() => {
      Alert.alert('Error', 'Search failed.');
    });
  };

  const handleAddToCart = useCallback((item) => {
    cart?.addToCart(item, 1);
    Alert.alert('Added to Cart', `${item.name} added to your cart.`);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topDecor} />

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.customerName}>{displayName}</Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.8}
          >
            <Icon name="cart-outline" size={24} color={colors.textWhite} />
            {cart?.totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Icon name="magnify" size={22} color={colors.textLight} />

          <TextInput
            placeholder="Search coffee, tea, desserts..."
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            selectionColor={colors.primary}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity onPress={handleSearch}>
            <Icon name="arrow-right" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        >
          <View style={styles.banner}>
            <View style={styles.bannerTextBox}>
              <Text style={styles.bannerSmall}>Today Special</Text>
              <Text style={styles.bannerTitle}>Fresh BrewNest Menu</Text>
              <Text style={styles.bannerDesc}>
                Browse your favourite cafe items and order in seconds.
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Icon name="coffee-to-go" size={68} color={colors.secondaryLight} />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(null);
                setSearch('');
              }}
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategoryId === null && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategoryId(null)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategoryId === null && styles.activeCategoryText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategoryId === category.id && styles.activeCategoryChip,
                ]}
                onPress={() => setSelectedCategoryId(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategoryId === category.id && styles.activeCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Menu</Text>
            <Text style={styles.itemCount}>{menuItems.length} items</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
          ) : menuItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Icon name="coffee-off-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptyText}>
                Try another category or search keyword.
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {menuItems.map((item) => (
                <BrewCard
                  key={item.id}
                  item={item}
                  onPress={() => navigation.navigate('MenuItemDetails', { itemId: item.id })}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </View>
          )}
        </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? 18 : 8,
    backgroundColor: colors.background,
  },

  topDecor: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: colors.secondaryLight,
    top: -95,
    right: -80,
    opacity: 0.45,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },

  customerName: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 3,
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -4,
    backgroundColor: colors.error,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  cartBadgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '900',
  },

  searchBox: {
    marginTop: 22,
    height: 52,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    color: colors.textPrimary,
    fontSize: 14,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  banner: {
    marginTop: 22,
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bannerTextBox: {
    flex: 1,
  },

  bannerSmall: {
    color: colors.secondaryLight,
    fontSize: 13,
    fontWeight: '700',
  },

  bannerTitle: {
    color: colors.textWhite,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 5,
  },

  bannerDesc: {
    color: '#EAD6BC',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  bannerIcon: {
    width: 88,
    height: 88,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionHeader: {
    marginTop: 23,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: '900',
  },

  clearText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '800',
  },

  itemCount: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },

  categoryScroll: {
    marginBottom: 2,
  },

  categoryChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activeCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '800',
  },

  activeCategoryText: {
    color: colors.textWhite,
  },

  loader: {
    marginTop: 50,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  emptyBox: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  emptyText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default CustomerDashboard;