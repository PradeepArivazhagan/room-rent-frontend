import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    roomNumber: "",
  },
  reducers: {
    roomNumberChange: (state, action) => {
      state.roomNumber = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { roomNumberChange } = userSlice.actions;

export default userSlice.reducer;
