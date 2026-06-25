import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PayHereScreen = ({ route, navigation }) => {
  const { paymentHtml, orderId } = route.params;

  const handleNavigation = (navState) => {
    const url = navState.url;

    if (url.includes('success')) {
      navigation.replace(
        'OrderDetails',
        { orderId }
      );
    }

    if (url.includes('cancel')) {
      navigation.goBack();
    }
  };

  return (
    <WebView
      source={{ html: paymentHtml }}
      onNavigationStateChange={handleNavigation}
      startInLoadingState
      renderLoading={() => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
};

export default PayHereScreen;