import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import RestaurantScreen from '../Screens/RestaurantScreen';
import CartScreen from '../Screens/CartScreen';
import OrderPreparingScreen from '../Screens/OrderPreparingScreen';
import DeliveryScreen from '../Screens/DeliveryScreen';
import AllRestaurant from '../Screens/AllRestaurant';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen.jsx';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen.jsx';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="OrderPreparing" options={{presentation:'fullScreenModal'}} component={OrderPreparingScreen} />
      <Stack.Screen name="Cart" options={{presentation:'modal'}} component={CartScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
      <Stack.Screen name="AllRestaurant" component={AllRestaurant} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})