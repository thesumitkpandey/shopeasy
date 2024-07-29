import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      cartPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload.product;
      const quantity = action.payload.quantity;
      const isExisting = state.cartItems.find((x) => x._id === item._id);

      if (!isExisting) {
        state.cartItems.push({ ...item, quantity });
      } else {
        isExisting.quantity += quantity;
      }
      state.cartPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart(state, action) {
      console.log(action);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseItemQuantity(state, action) {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item) {
        item.quantity++;
        state.cartPrice = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cartItems.find((x) => x._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.cartPrice = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
