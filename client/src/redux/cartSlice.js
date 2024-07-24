import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
    };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isExisting = state.cartItems.find((x) => x._id === item._id);
      if (!isExisting) {
        state.cartItems = [...cartItems, item];
        state.cartPrice = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart(state, action) {},
    increaseItemQuantity(state, action) {},
    decreaseItemQuantity(state, action) {},
    clearCart(state, action) {},
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
