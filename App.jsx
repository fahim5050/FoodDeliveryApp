import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'; // Adjust the path as necessary
import Navigation from './Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
