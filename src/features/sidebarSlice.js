import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { toggleSidebar, setSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;