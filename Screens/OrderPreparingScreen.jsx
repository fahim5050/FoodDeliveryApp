import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const OrderPreparingScreen = () => {
  const navigation = useNavigation();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Image
        style={styles.image}
        source={require('../Assets/images/BikeGuy.png')}
      />
    </View>
  );
};

export default OrderPreparingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#333', // Dark background color for dark mode
  },
  image: {
    height: 180,
    width: 180,
  },
});
