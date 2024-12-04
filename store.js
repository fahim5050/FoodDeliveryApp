import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/Apislice';
import  cartReducer  from './redux/CartSlice';

// Create the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer, // Add cartReducer to manage cart state
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
