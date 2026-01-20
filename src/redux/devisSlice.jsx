import { createSlice } from "@reduxjs/toolkit";

const devisSlice = createSlice({
  name: "devis",
  initialState: {
    items: [], // produits ajoutés au devis
  },
  reducers: {
    addToDevis: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromDevis: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToDevis, removeFromDevis } = devisSlice.actions;
export default devisSlice.reducer;
