import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product.id === action.payload.id);

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log('Items already added');
      }
      state.selectedItems = setSelectedItems(state);
      satisfies.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

// utilities functions
export const setSelectedItems = (state) =>
  state.products.reduce((totaL, product) => {
    return Number(totaL + product.quantity);
  });

export const setTotalPrice = (state) =>
  state.products.reduce((totaL, product) => {
    return Number(totaL + product.quantity * product.price);
  });
export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
  return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

// 4:17:49
