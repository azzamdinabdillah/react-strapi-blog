import { createSlice } from "@reduxjs/toolkit";

export const openSidebarDrawer = createSlice({
  name: "openSidebarDrawer",
  initialState: false,
  reducers: {
    open: () => true,
    close: () => false,
  },
});

export const { open, close } = openSidebarDrawer.actions;
