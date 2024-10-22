// src/features/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if available
const initialUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialToken = localStorage.getItem("token");

const initialState = {
    user: initialUser,
    token: initialToken,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear(); // Clear token on logout
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;