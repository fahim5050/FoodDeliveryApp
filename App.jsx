import {StyleSheet} from 'react-native';
import React from 'react';
import Navigation from './Navigation/Navigation';

import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
