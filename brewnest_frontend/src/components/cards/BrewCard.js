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

const BrewCard = ({
  name,
  description,
  price,
  image,
  rating,
  category,
  onPress,
  onFavorite,
  isFavorite = false,
}) => {
  const formattedPrice =
    typeof price === 'number' ? `Rs. ${price.toFixed(0)}` : `Rs. ${price || 0}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavorite}
        activeOpacity={0.8}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={19}
          color={isFavorite ? colors.error : colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="coffee-to-go" size={58} color={colors.secondary} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description || 'Freshly brewed coffee made for you'}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category || 'Coffee'}</Text>
          </View>

          {rating ? (
            <View style={styles.ratingContainer}>
              <Icon name="star" size={13} color={colors.warning} />
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formattedPrice}</Text>

          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Icon name="plus" size={18} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 5,
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: '#F8E8D4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    height: 110,
    borderRadius: 20,
    backgroundColor: '#F8E8D4',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 9,
  },
  categoryBadge: {
    backgroundColor: colors.transparentBrown,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '800',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 3,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.primary,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BrewCard;