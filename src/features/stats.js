import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { isStats: false, timestamp: 0 },
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    storeStats: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { storeStats } = statsSlice.actions;

export default statsSlice.reducer;
