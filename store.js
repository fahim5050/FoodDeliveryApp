import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/Apislice';
import  cartReducer  from './redux/CartSlice';
import  themeReducer  from './redux/ThemeSlice';

// Create the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer, // Add cartReducer to manage cart state
    theme: themeReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
   // Disabling the serializableStateInvariantMiddleware
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableStateInvariant: false,
    }),
});

export default store;
