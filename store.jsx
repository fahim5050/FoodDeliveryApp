import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './Slices/CartSlice'
import { RestaurantSlice } from './Slices/RestaurantSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    restaurant: RestaurantSlice,
  },
})