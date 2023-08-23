import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = {};
    },
  },
});

export const { storeUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
