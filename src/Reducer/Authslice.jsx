import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true", // Check sessionStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
      sessionStorage.setItem("isLoggedIn", "true"); // Store in sessionStorage
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      sessionStorage.setItem("isLoggedIn", "false"); // Store in sessionStorage
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
