import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: null,
  reducers: {
    setToken: (_, action) => localStorage.setItem("tokenJwt", action.payload),
  },
});

export const { setToken } = authSlice.actions;
