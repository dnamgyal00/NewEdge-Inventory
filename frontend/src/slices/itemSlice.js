import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemId: localStorage.getItem("itemId") ? parseInt(localStorage.getItem("itemId")) : 0,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemId: (state, action) => {
      state.itemId = action.payload;
      localStorage.setItem("itemId", action.payload);
    },
  },
});

export const { setItemId } = itemSlice.actions;

export default itemSlice.reducer;
