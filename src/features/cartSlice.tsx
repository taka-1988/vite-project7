import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface initialItemtState {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
}

interface initialCartState {
  items: initialItemtState[];
  totalQuantity: number;
  totalprice: number;
}

const initialState: initialCartState = {
  items: [],
  totalQuantity: 0,
  totalprice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= action.payload.quantity;
        if (existingItem.quantity < 1) {
          const newItems = state.items.filter(
            (item) => item.id !== action.payload.id
          );
          state.items = newItems;
        }
      }
    },
    setTotalQuantity: (state) => {
      let newTotalQuantity: number = 0;
      let newTotalprice: number = 0;
      state.items.forEach((item) => {
        newTotalQuantity += item.quantity;
        newTotalprice += item.price * item.quantity;
      });
      state.totalQuantity = newTotalQuantity;
      state.totalprice = newTotalprice;
    },
  },
});

export const selectItemQuantity = (state: RootState, id: string) => {
  const item = state.cart.items.find((item) => item.id == id);
  return item ? item.quantity : 0;
};

export const { addToCart, removeCart, setTotalQuantity } = cartSlice.actions;
export default cartSlice.reducer;
