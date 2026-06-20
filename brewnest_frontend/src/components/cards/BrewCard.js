import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';
import { getImageUrl } from '../../api/menuApi';

const BrewCard = ({
  item,
  name,
  description,
  price,
  imageUrl,
  categoryName,
  availabilityStatus,
  onPress,
  onAddToCart,
}) => {
  const finalName = item?.name || name;
  const finalDescription = item?.description || description;
  const finalPrice = item?.price || price;
  const finalImageUrl = item?.imageUrl || imageUrl;
  const finalCategory = item?.categoryName || categoryName || 'Coffee';
  const finalStatus = item?.availabilityStatus || availabilityStatus || 'AVAILABLE';

  const isAvailable = finalStatus === 'AVAILABLE';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageBox}>
        {finalImageUrl ? (
          <Image
            source={{ uri: getImageUrl(finalImageUrl) }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="coffee-to-go" size={48} color={colors.secondary} />
          </View>
        )}

        <View
          style={[
            styles.statusBadge,
            isAvailable ? styles.availableBadge : styles.outBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isAvailable ? styles.availableText : styles.outText,
            ]}
          >
            {isAvailable ? 'Available' : 'Out'}
          </Text>
        </View>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {finalName}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {finalDescription}
      </Text>

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{finalCategory}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>Rs. {Number(finalPrice || 0).toFixed(0)}</Text>

        <TouchableOpacity
          style={[styles.addButton, !isAvailable && styles.disabledAddButton]}
          onPress={onAddToCart}
          disabled={!isAvailable}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={18} color={colors.textWhite} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  imageBox: {
    width: '100%',
    height: 110,
    borderRadius: 18,
    backgroundColor: '#F8E8D4',
    overflow: 'hidden',
    marginBottom: 11,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
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

  statusText: {
    fontSize: 9,
    fontWeight: '900',
  },

  availableText: {
    color: colors.success,
  },

  outText: {
    color: colors.error,
  },

  name: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textPrimary,
  },

  description: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 4,
    minHeight: 32,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.transparentBrown,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },

  categoryText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '800',
  },

  footer: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '900',
  },

  addButton: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledAddButton: {
    backgroundColor: colors.textLight,
  },
});

export default BrewCard;