import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

// Create the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
