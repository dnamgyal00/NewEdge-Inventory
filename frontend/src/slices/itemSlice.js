import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemId: 0,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
  },
});

export const { setItemId } = itemSlice.actions;

export default itemSlice.reducer;
