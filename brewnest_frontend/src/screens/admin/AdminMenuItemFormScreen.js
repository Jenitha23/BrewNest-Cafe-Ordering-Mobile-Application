import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { getImageUrl, menuApi } from '../../api/menuApi';

const availabilityOptions = ['AVAILABLE', 'OUT_OF_STOCK', 'HIDDEN'];

const AdminMenuItemFormScreen = ({ navigation, route }) => {
  const editingItem = route.params?.item || null;

  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    categoryId: editingItem?.categoryId || null,
    price: editingItem?.price ? String(editingItem.price) : '',
    availabilityStatus: editingItem?.availabilityStatus || 'AVAILABLE',
    imageUrl: editingItem?.imageUrl || null,
  });

  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const data = await menuApi.getAdminCategories();
      setCategories(data || []);

      if (!formData.categoryId && data?.length > 0) {
        setFormData((prev) => ({ ...prev, categoryId: data[0].id }));
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load categories.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission Required', 'Please allow image access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0]);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Item name is required.');
      return false;
    }

    if (!formData.description.trim()) {
      Alert.alert('Validation Error', 'Description is required.');
      return false;
    }

    if (!formData.categoryId) {
      Alert.alert('Validation Error', 'Category is required.');
      return false;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      Alert.alert('Validation Error', 'Valid price is required.');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId,
        price: Number(formData.price),
        imageUrl: formData.imageUrl,
        availabilityStatus: formData.availabilityStatus,
      };

      let savedItem;

      if (editingItem) {
        savedItem = await menuApi.updateMenuItem(editingItem.id, payload);
      } else {
        savedItem = await menuApi.createMenuItem(payload);
      }

      if (selectedImage) {
        await menuApi.uploadMenuItemImage(savedItem.id, selectedImage);
      }

      Alert.alert(
        'Success',
        editingItem ? 'Menu item updated successfully.' : 'Menu item created successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Save failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!editingItem) {
      setSelectedImage(null);
      updateField('imageUrl', null);
      return;
    }

    try {
      setLoading(true);
      const updated = await menuApi.removeMenuItemImage(editingItem.id);
      updateField('imageUrl', updated.imageUrl);
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', 'Image remove failed.');
    } finally {
      setLoading(false);
    }
  };

  const previewImageUri = selectedImage?.uri || getImageUrl(formData.imageUrl);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.title}>{editingItem ? 'Edit Item' : 'Add Item'}</Text>

          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {previewImageUri ? (
              <Image source={{ uri: previewImageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="image-plus" size={54} color={colors.secondary} />
                <Text style={styles.imageText}>Upload item image</Text>
              </View>
            )}
          </TouchableOpacity>

          {previewImageUri && (
            <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
              <Icon name="image-remove-outline" size={18} color={colors.error} />
              <Text style={styles.removeImageText}>Remove Image</Text>
            </TouchableOpacity>
          )}

          <View style={styles.formCard}>
            <Text style={styles.label}>Item Name</Text>
            <View style={styles.inputBox}>
              <Icon name="coffee-outline" size={20} color={colors.primaryLight} />
              <TextInput
                style={styles.input}
                placeholder="Latte, Brownie, Tea..."
                placeholderTextColor={colors.textLight}
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text style={styles.label}>Description</Text>
            <View style={[styles.inputBox, styles.descriptionBox]}>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Enter item description"
                placeholderTextColor={colors.textLight}
                value={formData.description}
                onChangeText={(text) => updateField('description', text)}
                multiline
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text style={styles.label}>Price</Text>
            <View style={styles.inputBox}>
              <Icon name="cash" size={20} color={colors.primaryLight} />
              <TextInput
                style={styles.input}
                placeholder="850"
                placeholderTextColor={colors.textLight}
                value={formData.price}
                onChangeText={(text) => updateField('price', text)}
                keyboardType="numeric"
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.chip,
                    formData.categoryId === category.id && styles.activeChip,
                  ]}
                  onPress={() => updateField('categoryId', category.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.categoryId === category.id && styles.activeChipText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Availability</Text>
            <View style={styles.statusWrap}>
              {availabilityOptions.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusChip,
                    formData.availabilityStatus === status && styles.activeChip,
                  ]}
                  onPress={() => updateField('availabilityStatus', status)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      formData.availabilityStatus === status && styles.activeChipText,
                    ]}
                  >
                    {status.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.textWhite} />
              ) : (
                <Text style={styles.saveText}>
                  {editingItem ? 'Update Menu Item' : 'Create Menu Item'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
    padding: 18,
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
    fontSize: 21,
    color: colors.textPrimary,
    fontWeight: '900',
  },

  imagePicker: {
    height: 190,
    borderRadius: 26,
    backgroundColor: '#F8E8D4',
    marginTop: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 8,
  },

  removeImageButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  removeImageText: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 5,
  },

  formCard: {
    backgroundColor: '#F8E8D4',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 16,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 14,
    marginBottom: 8,
  },

  inputBox: {
    minHeight: 50,
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

  descriptionBox: {
    height: 90,
    alignItems: 'flex-start',
    paddingTop: 10,
  },

  descriptionInput: {
    height: '100%',
    textAlignVertical: 'top',
    marginLeft: 0,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 9,
  },

  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chipText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '900',
  },

  activeChipText: {
    color: colors.textWhite,
  },

  statusWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statusChipText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '900',
  },

  saveButton: {
    height: 55,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  saveText: {
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '900',
  },
});

export default AdminMenuItemFormScreen;