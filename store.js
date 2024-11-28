import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './redux/Apislice';

// Create the Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
