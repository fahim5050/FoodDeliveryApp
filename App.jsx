import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 10000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Navigation />
  );
}

export default App;

const styles = StyleSheet.create({})