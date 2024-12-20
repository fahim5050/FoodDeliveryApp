// NotificationIcon.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import { useSelector } from 'react-redux';

const NotificationIcon = ({ notificationCount = 0, onPress }) => {
  const darkMode = useSelector(state => state.theme.darkMode); 
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconWrapper}>
      <Icon.Bell  stroke={darkMode ? '#000' : '#fff'}
        width={25}
        height={25} />
      {notificationCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notificationCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default NotificationIcon;
