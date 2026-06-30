import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,  
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { getImageUrl, menuApi } from '../../api/menuApi';
import AdminScreenBackground from './AdminScreenBackground';

const statuses = ['ALL', 'AVAILABLE', 'OUT_OF_STOCK', 'HIDDEN'];

const AdminMenuManagementScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    const data = await menuApi.getAdminCategories();
    setCategories(data || []);
  };

  const loadItems = async () => {
    const data = await menuApi.getAdminMenuItems({
      categoryId: selectedCategoryId,
      status: selectedStatus === 'ALL' ? null : selectedStatus,
      search,
    });

    setItems(data || []);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await loadCategories();
      await loadItems();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', 'Unable to load menu items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
  if (!categories.length) return;

  loadItems().catch(() => {});
}, [selectedStatus, selectedCategoryId, categories]);

  const handleDelete = (item) => {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await menuApi.deleteMenuItem(item.id);
              await loadItems();
            } catch (error) {
              Alert.alert('Error', 'Delete failed.');
            }
          },
        },
      ]
    );
  };

  const handleAvailability = async (item, status) => {
    try {
      await menuApi.updateAvailability(item.id, status);
      await loadItems();
    } catch (error) {
      Alert.alert('Error', 'Availability update failed.');
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'AVAILABLE') return styles.availableBadge;
    if (status === 'OUT_OF_STOCK') return styles.outBadge;
    return styles.hiddenBadge;
  };

  return (
    <AdminScreenBackground>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallTitle}>Admin Side</Text>
            <Text style={styles.title}>Menu Management</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AdminMenuItemForm')}
          >
            <Icon name="plus" size={23} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Icon name="magnify" size={21} color={colors.textLight} />

          <TextInput
            placeholder="Search menu items..."
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={loadItems}
            selectionColor={colors.primary}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity onPress={loadItems}>
            <Icon name="arrow-right" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('AdminCategoryManagement')}
          >
            <Icon name="shape-outline" size={18} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Categories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={loadData}>
            <Icon name="refresh" size={18} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.filterScroll}
  contentContainerStyle={{ 
    paddingVertical: 8,
    alignItems: 'center',   
    paddingRight: 20,
  }}
>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                selectedStatus === status && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === status && styles.activeFilterText,
                ]}
              >
                {status.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.filterScroll}
  contentContainerStyle={{ 
    paddingVertical: 2,
    alignItems: 'center',     
    paddingRight: 20,
  }}
>
          <TouchableOpacity
            style={[
              styles.filterChip,
              selectedCategoryId === null && styles.activeFilterChip,
            ]}
            onPress={() => setSelectedCategoryId(null)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategoryId === null && styles.activeFilterText,
              ]}
            >
              All Categories
            </Text>
          </TouchableOpacity>

          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterChip,
                selectedCategoryId === category.id && styles.activeFilterChip,
              ]}
              onPress={() => setSelectedCategoryId(category.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategoryId === category.id && styles.activeFilterText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 60 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.imageBox}>
                  {item.imageUrl ? (
                    <Image source={{ uri: getImageUrl(item.imageUrl) }} style={styles.image} />
                  ) : (
                    <Icon name="coffee-to-go" size={42} color={colors.secondary} />
                  )}
                </View>

                <View style={styles.itemContent}>
                  <View style={styles.itemTopRow}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View style={[styles.statusBadge, getStatusStyle(item.availabilityStatus)]}>
                      <Text style={styles.statusText}>
                        {item.availabilityStatus.replace('_', ' ')}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>

                  <View style={styles.itemMetaRow}>
                    <Text style={styles.itemCategory}>{item.categoryName}</Text>
                    <Text style={styles.itemPrice}>Rs. {Number(item.price).toFixed(0)}</Text>
                  </View>

                  <View style={styles.itemActionRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('AdminMenuItemForm', { item })}
                    >
                      <Icon name="pencil" size={16} color={colors.primary} />
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item)}
                    >
                      <Icon name="trash-can-outline" size={16} color={colors.error} />
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.statusActionRow}>
                    <TouchableOpacity
                      style={styles.statusButton}
                      onPress={() => handleAvailability(item, 'AVAILABLE')}
                    >
                      <Text style={styles.statusButtonText}>Available</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.statusButton}
                      onPress={() => handleAvailability(item, 'OUT_OF_STOCK')}
                    >
                      <Text style={styles.statusButtonText}>Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.statusButton}
                      onPress={() => handleAvailability(item, 'HIDDEN')}
                    >
                      <Text style={styles.statusButtonText}>Hide</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
    </AdminScreenBackground>
  );
};

const PHONE_WIDTH = 460;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  screen: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_WIDTH,
    alignSelf: 'center',
    padding: 18,
    paddingBottom: 18,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBox: {
    height: 50,
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 6,
  },

 filterScroll: {
  marginTop: 12,
  overflow: 'visible',
},

filterChip: {
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,

  
  height: 38,
  paddingHorizontal: 16,

  borderRadius: 19,

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 8,
},

filterText: {
  fontSize: 14,
  fontWeight: '800',
  color: colors.primaryLight,
},

activeFilterChip: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},

activeFilterText: {
  color: colors.textWhite,
},
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
  },

  imageBox: {
    width: 82,
    height: 92,
    borderRadius: 18,
    backgroundColor: colors.secondaryLight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  itemContent: {
    flex: 1,
    marginLeft: 12,
  },

  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemName: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '900',
    marginRight: 8,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  availableBadge: {
    backgroundColor: '#E4F4E6',
  },

  outBadge: {
    backgroundColor: '#FBE3DF',
  },

  hiddenBadge: {
    backgroundColor: '#ECE7E2',
  },

  statusText: {
    fontSize: 9,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  itemDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 5,
  },

  itemMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  itemCategory: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '800',
  },

  itemPrice: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '900',
  },

  itemActionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.transparentBrown,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  editText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 4,
  },

  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBE3DF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  deleteText: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 4,
  },

  statusActionRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 6,
  },

  statusButton: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
  },

  statusButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
});

export default AdminMenuManagementScreen;