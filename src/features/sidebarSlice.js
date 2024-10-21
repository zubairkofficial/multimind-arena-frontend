import { createSlice } from "@reduxjs/toolkit";

// Initial state for both sidebars
const initialSidebarState = {
    sidebarOpen: true,
};

const initialRightSidebarState = {
    rightSidebarOpen: false,
};

// Slice for left sidebar
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: initialSidebarState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
    },
});

// Slice for right sidebar
const rightSidebarSlice = createSlice({
    name: "rightSidebar",
    initialState: initialRightSidebarState,
    reducers: {
        toggleRightSidebar: (state) => {
            state.rightSidebarOpen = !state.rightSidebarOpen;
        },
        setRightSidebarOpen: (state, action) => {
            state.rightSidebarOpen = action.payload;
        },
    },
});

// Export actions
export const { toggleSidebar, setSidebarOpen } = sidebarSlice.actions;
export const { toggleRightSidebar, setRightSidebarOpen } = rightSidebarSlice.actions;

// Export reducers
export const sidebarReducer = sidebarSlice.reducer;
export const rightSidebarReducer = rightSidebarSlice.reducer;