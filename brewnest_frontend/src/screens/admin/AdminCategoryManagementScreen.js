import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,  
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { menuApi } from '../../api/menuApi';

const AdminCategoryManagementScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await menuApi.getAdminCategories();
      setCategories(data || []);
    } catch (error) {
      Alert.alert('Error', 'Unable to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setCategoryName('');
    setEditingCategory(null);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Validation Error', 'Category name is required.');
      return;
    }

    try {
      if (editingCategory) {
        await menuApi.updateCategory(editingCategory.id, {
          name: categoryName.trim(),
          isActive: editingCategory.isActive,
        });
      } else {
        await menuApi.createCategory({
          name: categoryName.trim(),
          isActive: true,
        });
      }

      resetForm();
      await loadCategories();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Save failed.');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleDelete = (category) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete ${category.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await menuApi.deleteCategory(category.id);
              await loadCategories();
            } catch (error) {
              Alert.alert('Error', 'Delete failed.');
            }
          },
        },
      ]
    );
  };

  const handleToggleActive = async (category) => {
    try {
      await menuApi.updateCategory(category.id, {
        name: category.name,
        isActive: !category.isActive,
      });

      await loadCategories();
    } catch (error) {
      Alert.alert('Error', 'Status update failed.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.title}>Categories</Text>

          <TouchableOpacity onPress={loadCategories}>
            <Icon name="refresh" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {editingCategory ? 'Rename Category' : 'Add Category'}
          </Text>

          <View style={styles.inputBox}>
            <Icon name="shape-outline" size={20} color={colors.primaryLight} />

            <TextInput
              style={styles.input}
              placeholder="Coffee, Tea, Desserts..."
              placeholderTextColor={colors.textLight}
              value={categoryName}
              onChangeText={setCategoryName}
              selectionColor={colors.primary}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.formActions}>
            {editingCategory && (
              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>
                {editingCategory ? 'Update' : 'Add Category'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Icon name="coffee" size={25} color={colors.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryStatus}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleToggleActive(category)}
                >
                  <Icon
                    name={category.isActive ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(category)}>
                  <Icon name="pencil-outline" size={20} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(category)}>
                  <Icon name="trash-can-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
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
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  formCard: {
    backgroundColor: '#F8E8D4',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20,
    marginBottom: 16,
  },

  formTitle: {
    fontSize: 17,
    color: colors.textPrimary,
    fontWeight: '900',
    marginBottom: 12,
  },

  inputBox: {
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },

  formActions: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: colors.primary,
    fontWeight: '900',
  },

  saveButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: colors.textWhite,
    fontWeight: '900',
  },

  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  categoryIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#F8E8D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  categoryName: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  categoryStatus: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },

  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdminCategoryManagementScreen;