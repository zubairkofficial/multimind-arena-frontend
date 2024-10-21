import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './../features/api/apiSlice';
import { arenaSlice } from './../features/arenaSlice'; // Import the arena slice
import { sidebarReducer, rightSidebarReducer } from './../features/sidebarSlice';
import userReducer from './../features/userSlice'; // Import the user slice reducer

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
    reducer: {
        // Add the API slice reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Add the Arena slice reducer
        [arenaSlice.reducerPath]: arenaSlice.reducer,
        // Other reducers
        sidebar: sidebarReducer,
        rightSidebar: rightSidebarReducer,
        user: userReducer, // Add user reducer here
    },

    // Adding the API middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, arenaSlice.middleware),
});
/* eslint-enable */