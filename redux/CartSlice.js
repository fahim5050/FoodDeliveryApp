//redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Update quantity and price if the item already exists in the cart
        existingItem.quantity += newItem.quantity;
        state.totalQuantity += newItem.quantity;  // Update totalQuantity based on the new quantity
        state.totalPrice += newItem.price * newItem.quantity;
      } else {
        // Add new item to the cart
        state.items.push(newItem);
        state.totalQuantity += newItem.quantity;  // Update totalQuantity based on the new item's quantity
        state.totalPrice += newItem.price * newItem.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;  // Subtract the quantity of the item being removed
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
