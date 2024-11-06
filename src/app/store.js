import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "../features/api/authApi";
import { userApi } from "../features/api/userApi"; // Import the arena slice
import { bundleApi } from "../features/api/bundleApi"; // Import the arena slice
import { sidebarReducer, rightSidebarReducer } from './../features/sidebarSlice';
import userReducer from './../features/userSlice'; // Import the user slice reducer

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [bundleApi.reducerPath]: bundleApi.reducer,
        // Other reducers
        sidebar: sidebarReducer,
        rightSidebar: rightSidebarReducer,
        user: userReducer, // Add user reducer here
    },

    // Adding the API middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware,bundleApi.middleware),
});
/* eslint-enable */