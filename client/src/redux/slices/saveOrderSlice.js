import { createSlice } from "@reduxjs/toolkit";

export const saveOrderSlice = createSlice({
  name: "saveOrder",
  initialState: {
    orders: [],
  },
  reducers: {
    saveOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { saveOrder } = saveOrderSlice.actions;
export default saveOrderSlice.reducer;
