import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';

const STEPS = [
  'PENDING',
  'PREPARING',
  'READY',
  'COMPLETED',
];

export default function OrderTimeline({
  currentStatus,
}) {
  const currentIndex =
    STEPS.indexOf(currentStatus);

  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const completed =
          index <= currentIndex;

        return (
          <View
            key={step}
            style={styles.row}
          >
            <Icon
              name={
                completed
                  ? 'check-circle'
                  : 'circle-outline'
              }
              size={24}
              color={
                completed
                  ? colors.primary
                  : '#CFCFCF'
              }
            />

            <Text
              style={[
                styles.text,
                completed &&
                  styles.activeText,
              ]}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  text: {
    marginLeft: 12,
    color: '#999',
    fontSize: 15,
  },

  activeText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});