import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import BrewCard from '../../components/cards/BrewCard';
import { AuthContext } from '../../context/AuthContext';

const categories = ['Cappuccino', 'Black Coffee', 'Latte', 'Dessert'];

const brews = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Creamy espresso with steamed milk foam',
    price: 850,
    rating: 4.8,
    category: 'Coffee',
  },
  {
    id: 2,
    name: 'Iced Coffee',
    description: 'Cold coffee with smooth roasted flavour',
    price: 750,
    rating: 4.6,
    category: 'Cold',
  },
  {
    id: 3,
    name: 'Cafe Latte',
    description: 'Rich espresso mixed with warm milk',
    price: 900,
    rating: 4.7,
    category: 'Coffee',
  },
  {
    id: 4,
    name: 'Chocolate Cake',
    description: 'Soft chocolate cake slice for coffee time',
    price: 650,
    rating: 4.5,
    category: 'Dessert',
  },
];

const CustomerDashboard = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const user = auth?.user || auth?.customer || auth?.userData;

  const displayName =
    user?.fullName || user?.name || user?.email?.split('@')[0] || 'Coffee Lover';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topDecor} />

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.customerName}>{displayName}</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <Icon name="account" size={24} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Icon name="magnify" size={22} color={colors.textLight} />
          <TextInput
            placeholder="Search coffee..."
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
          />
          <Icon name="tune-variant" size={22} color={colors.primary} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerSmallText}>Today Special</Text>
              <Text style={styles.bannerTitle}>Buy 1 Get 1 Free</Text>
              <Text style={styles.bannerText}>
                Enjoy your favourite BrewNest coffee today.
              </Text>
            </View>

            <View style={styles.bannerIcon}>
              <Icon name="coffee-to-go" size={70} color={colors.secondaryLight} />
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryChip,
                  index === 0 && styles.activeCategoryChip,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.categoryText,
                    index === 0 && styles.activeCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Menu</Text>
            <Text style={styles.seeAll}>View more</Text>
          </View>

          <View style={styles.grid}>
            {brews.map((item) => (
              <BrewCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                category={item.category}
                onPress={() => {}}
                onFavorite={() => {}}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Icon name="home" size={23} color={colors.primary} />
            <Text style={styles.activeNavText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Favorites')}
            activeOpacity={0.8}
          >
            <Icon name="heart-outline" size={23} color={colors.textLight} />
            <Text style={styles.navText}>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Orders')}
            activeOpacity={0.8}
          >
            <Icon name="clipboard-text-outline" size={23} color={colors.textLight} />
            <Text style={styles.navText}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <Icon name="account-outline" size={23} color={colors.textLight} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 18 : 8,
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
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
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
    fontSize: 15,
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
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerSmallText: {
    color: colors.secondaryLight,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerTitle: {
    color: colors.textWhite,
    fontSize: 21,
    fontWeight: '900',
  },
  bannerText: {
    color: '#EAD6BC',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  bannerIcon: {
    width: 92,
    height: 92,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sectionHeader: {
    marginTop: 24,
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
  seeAll: {
    color: colors.primaryLight,
    fontSize: 13,
    fontWeight: '800',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomNav: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 14,
    height: 70,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: colors.textLight,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },
  activeNavText: {
    color: colors.primary,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '900',
  },
});

export default CustomerDashboard;