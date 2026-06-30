import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

/**
 * Shared background wrapper for all Admin screens.
 * Renders the app background image with a translucent brown
 * overlay (colors.overlay) so text/content stays readable,
 * then renders children on top.
 *
 * Usage:
 *   <AdminScreenBackground>
 *     <SafeAreaView style={styles.safeArea}>
 *       ...screen content...
 *     </SafeAreaView>
 *   </AdminScreenBackground>
 */
const AdminScreenBackground = ({ children, overlayOpacity }) => {
  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          overlayOpacity !== undefined && { backgroundColor: `rgba(59, 31, 18, ${overlayOpacity})` },
        ]}
      >
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
});

export default AdminScreenBackground;
