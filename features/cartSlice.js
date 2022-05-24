import { createSlice } from '@reduxjs/toolkit'
import { setTotalPrice } from '../helpers/setTotalPrice';

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const products = action.payload.products;
      const productItem = products.find(item => item.id === action.payload.id);
      const itemIdx = state.cart.findIndex(item => item.id === action.payload.id);
      if(itemIdx >= 0) {
        state.cart[itemIdx].quantity += action.payload.value;
        state.totalQuantity += action.payload.value;
        state.totalPrice = setTotalPrice(state.totalPrice, action.payload);
      } else {
        state.cart.push({
          ...productItem,
          quantity: action.payload.value
        })
        state.totalQuantity += action.payload.value;
        state.totalPrice = setTotalPrice(state.totalPrice, action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
      state.totalQuantity -= action.payload.value;
      state.totalPrice = setTotalPrice(state.totalPrice, action.payload);

    },
    adjustQuantity: (state, action) => {
      state.cart.map(item => {
        if(item.id === action.payload.id) {
          item.quantity += action.payload.value;
          state.totalQuantity += action.payload.value;
          state.totalPrice = setTotalPrice(state.totalPrice, action.payload);
        }
      })
      state.cart = state.cart.filter(item => item.quantity > 0);
    }
  },
});

export const {addToCart, removeFromCart, adjustQuantity} = cartSlice.actions
export default cartSlice.reducer