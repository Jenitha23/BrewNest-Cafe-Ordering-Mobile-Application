import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminScreenBackground from './AdminScreenBackground';

const AdminSettingsScreen = ({ navigation }) => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [autoBackup, setAutoBackup] = React.useState(false);

  const settingsSections = [
    {
      title: 'System Settings',
      items: [
        { icon: 'email', label: 'Email Notifications', type: 'switch', value: emailNotifications, onValueChange: setEmailNotifications },
        { icon: 'database', label: 'Auto Backup', type: 'switch', value: autoBackup, onValueChange: setAutoBackup },
        { icon: 'clock', label: 'Business Hours', type: 'link' },
        { icon: 'currency-usd', label: 'Tax Settings', type: 'link' },
      ],
    },
    {
      title: 'Security',
      items: [
        { icon: 'shield', label: 'Audit Logs', type: 'link' },
        { icon: 'account-key', label: 'Role Permissions', type: 'link' },
        { icon: 'lock', label: 'Security Settings', type: 'link' },
      ],
    },
    {
      title: 'System Info',
      items: [
        { icon: 'information', label: 'App Version', type: 'info', value: '1.0.0' },
        { icon: 'server', label: 'API Status', type: 'info', value: 'Connected' },
      ],
    },
  ];

  return (
    <AdminScreenBackground>
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.settingItem}
                  onPress={() => item.type === 'link' && console.log('Navigate:', item.label)}
                >
                  <View style={styles.settingLeft}>
                    <Icon name={item.icon} size={22} color={colors.primary} />
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  {item.type === 'switch' && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.surface}
                    />
                  )}
                  {item.type === 'info' && (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  )}
                  {item.type === 'link' && (
                    <Icon name="chevron-right" size={22} color={colors.textLight} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    </AdminScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AdminSettingsScreen;