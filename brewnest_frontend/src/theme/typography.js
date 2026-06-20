import { Platform } from 'react-native';
import { colors } from './colors';

// Font family configuration
const fontFamily = {
  regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
  medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  light: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
  thin: Platform.OS === 'ios' ? 'System' : 'Roboto-Thin',
};

// Font sizes
const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 40,
  '7xl': 48,
  '8xl': 56,
};

// Line heights
const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Letter spacing
const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
};

// Typography variants
export const typography = {
  // Display styles - Large headings
  display1: {
    fontSize: fontSize['7xl'],
    fontWeight: '700',
    lineHeight: fontSize['7xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  display2: {
    fontSize: fontSize['6xl'],
    fontWeight: '700',
    lineHeight: fontSize['6xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  display3: {
    fontSize: fontSize['5xl'],
    fontWeight: '600',
    lineHeight: fontSize['5xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  // Heading styles
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: '700',
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: '700',
    lineHeight: fontSize['3xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    lineHeight: fontSize.xl * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    lineHeight: fontSize.lg * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  h6: {
    fontSize: fontSize.base,
    fontWeight: '600',
    lineHeight: fontSize.base * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },

  // Body text styles
  body1: {
    fontSize: fontSize.base,
    fontWeight: '400',
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  body2: {
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
  body3: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Caption styles
  caption1: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  caption2: {
    fontSize: fontSize.xs,
    fontWeight: '400',
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textLight,
  },

  // Button text styles
  buttonLarge: {
    fontSize: fontSize.base,
    fontWeight: '600',
    lineHeight: fontSize.base * lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.medium,
    textTransform: 'uppercase',
  },
  buttonMedium: {
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: fontSize.md * lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.medium,
    textTransform: 'uppercase',
  },
  buttonSmall: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    lineHeight: fontSize.sm * lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.medium,
    textTransform: 'uppercase',
  },

  // Label styles
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
  },

  // Error text
  error: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.error,
  },

  // Success text
  success: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.success,
  },

  // Link text
  link: {
    fontSize: fontSize.md,
    fontWeight: '500',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  // Price text
  price: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    lineHeight: fontSize.xl * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },

  // Small price
  priceSmall: {
    fontSize: fontSize.base,
    fontWeight: '600',
    lineHeight: fontSize.base * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },

  // Badge text
  badge: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    lineHeight: fontSize.xs * lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.medium,
    textTransform: 'uppercase',
    color: colors.textWhite,
  },

  // Number text
  number: {
    fontSize: fontSize['3xl'],
    fontWeight: '700',
    lineHeight: fontSize['3xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  // Stat value
  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },

  // Quote text
  quote: {
    fontSize: fontSize.lg,
    fontWeight: '400',
    lineHeight: fontSize.lg * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },

  // Code text
  code: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: colors.textPrimary,
    backgroundColor: colors.border,
    padding: 4,
    borderRadius: 4,
  },

  // Toast message
  toast: {
    fontSize: fontSize.md,
    fontWeight: '500',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textWhite,
  },

  // Empty state
  emptyTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  emptySubtext: {
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // App title
  appTitle: {
    fontSize: fontSize['7xl'],
    fontWeight: '700',
    lineHeight: fontSize['7xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.bold,
    color: colors.textWhite,
  },
  appTagline: {
    fontSize: fontSize.base,
    fontWeight: '300',
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
    fontFamily: fontFamily.light,
    color: colors.secondaryLight,
  },

  // Form labels
  formLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  formError: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.error,
  },

  // Screen titles
  screenTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  screenSubtitle: {
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Tab labels
  tabLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    lineHeight: fontSize.sm * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
  },

  // Notification
  notificationTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: fontSize.md * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  notificationBody: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Time stamp
  timestamp: {
    fontSize: fontSize.xs,
    fontWeight: '400',
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textLight,
  },

  // Order status
  orderStatus: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    lineHeight: fontSize.sm * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
  },

  // Menu item
  menuItemName: {
    fontSize: fontSize.base,
    fontWeight: '600',
    lineHeight: fontSize.base * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  menuItemPrice: {
    fontSize: fontSize.base,
    fontWeight: '700',
    lineHeight: fontSize.base * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.primary,
  },
  menuItemDescription: {
    fontSize: fontSize.sm,
    fontWeight: '400',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },

  // Admin specific
  adminBadge: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    lineHeight: fontSize.xs * lineHeight.tight,
    letterSpacing: letterSpacing.wider,
    fontFamily: fontFamily.bold,
    textTransform: 'uppercase',
    color: colors.primary,
  },
  adminStatNumber: {
    fontSize: fontSize['4xl'],
    fontWeight: '700',
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  adminStatLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
  },

  // Dashboard greeting
  greeting: {
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    lineHeight: fontSize['2xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
};

// Helper function to combine typography with custom styles
export const getTypography = (variant, customStyles = {}) => {
  const baseStyles = typography[variant] || typography.body1;
  return {
    ...baseStyles,
    ...customStyles,
  };
};

// Helper function for responsive font size
export const responsiveFontSize = (size) => {
  // You can implement responsive logic here based on screen width
  return size;
};

// Export individual components for easier imports
export default typography;