import React, {useEffect, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import Navigation from './Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme state
    // const loadTheme = async () => {
    //   const savedTheme = await AsyncStorage.getItem('isDarkMode');
    //   setIsDarkMode(savedTheme === 'true');
    // };
    // loadTheme();

    // Hide the splash screen
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
};

export default App;
