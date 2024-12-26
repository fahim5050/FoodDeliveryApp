import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import RestaurantScreen from '../Screens/RestaurantScreen';
import CartScreen from '../Screens/CartScreen';
import OrderPreparingScreen from '../Screens/OrderPreparingScreen';
import DeliveryScreen from '../Screens/DeliveryScreen';
import AllRestaurant from '../Screens/AllRestaurant';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen.jsx';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen.jsx';
import SubDishes from '../Components/Subdishes/Subdishes.jsx';
// import SignInScreen from '../Screens/SignInScreen/SignInScreen.jsx';
import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen.jsx';
import SingleProduct from '../Components/SingleProduct/SingleProduct.jsx';
import { useSelector } from 'react-redux';
import EditProfileScreen from '../Screens/EditProfileScreen/EditProfileScreen.jsx';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode); // Get theme state
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{
        headerShown:false,
      }}>
      {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="OrderPreparing" options={{presentation:'fullScreenModal'}} component={OrderPreparingScreen} />
      <Stack.Screen name="Cart" options={{presentation:'modal'}} component={CartScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
      <Stack.Screen name="AllRestaurant" component={AllRestaurant} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="SubDishes" component={SubDishes} />
      <Stack.Screen name="SingleProduct" component={SingleProduct} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})