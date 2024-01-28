import { createSlice } from "@reduxjs/toolkit";

// Retrieve categoryId from localStorage, defaulting to 0 if not found
const categoryIdFromLocalStorage = localStorage.getItem("categoryId");
const initialState = {
  categoryId: categoryIdFromLocalStorage ? parseInt(categoryIdFromLocalStorage) : 0,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
      localStorage.setItem("categoryId", action.payload);
    },
  },
});

export const { setCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
