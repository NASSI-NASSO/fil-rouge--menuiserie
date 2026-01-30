import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],      // produits du devis
  total: 0        // total en MAD
};

const devisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    addToDevis: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1
        });
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.prix * item.quantity,
        0
      );

     // state.total += product.prix;
    },

    removeFromDevis: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
         state.total = state.items.reduce(
        (sum, item) => sum + item.prix * item.quantity,
        0
      );
       // state.total -= item.prix * item.quantity;
        state.items = state.items.filter((i) => i.id !== id);
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = state.items.reduce(
        (sum, item) => sum + item.prix * item.quantity,
        0
      );
        //state.total += item.prix;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
         state.total = state.items.reduce(
        (sum, item) => sum + item.prix * item.quantity,
        0
      );
       // state.total -= item.prix;
      }
    },
  clearDevis: (state) => {
  state.items = [];
  state.total = 0;
}
  }
});

export const {
  addToDevis,
  removeFromDevis,
  increaseQty,
  decreaseQty,
  clearDevis
} = devisSlice.actions;

export default devisSlice.reducer;
