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
      const existingItem = state.items.find((item) => item.foodId === newItem.foodId);

      if (existingItem) {
        // Update quantity and price if the item already exists in the cart
        existingItem.quantity += newItem.quantity;
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
      } else {
        // Add new item to the cart
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 }); // Default quantity to 1 if not provided
        state.totalQuantity += newItem.quantity || 1;
        state.totalPrice += newItem.price * (newItem.quantity || 1);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.foodId === itemId);
    
      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrement quantity and update totals
          existingItem.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.price;
        } else {
          // Remove item when quantity is 1
          state.items = state.items.filter((item) => item.foodId !== itemId);
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.price;
        }
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
