import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "../features/api/authApi";
import { userApi } from "../features/api/userApi"; // Import the arena slice
import { bundleApi } from "../features/api/bundleApi"; // Import the arena slice
import { cardApi } from "../features/api/cardApi"; // Import the arena slice
import { llmModelApi } from "../features/api/LlmModelApi"; // Import the arena slice
import { subscriptionApi } from "../features/api/subscriptionApi"; // Import the arena slice
import { sidebarReducer, rightSidebarReducer } from './../features/sidebarSlice';
import userReducer from './../features/userSlice'; // Import the user slice reducer
import authReducer from "../features/api/authSlice"; // Import the auth slice reducer

/* eslint-disable no-underscore-dangle */
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [bundleApi.reducerPath]: bundleApi.reducer,
        [cardApi.reducerPath]: cardApi.reducer,
        [llmModelApi.reducerPath]: llmModelApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        // Other reducers
        sidebar: sidebarReducer,
        auth: authReducer, // Add auth reducer
        rightSidebar: rightSidebarReducer,
        user: userReducer, // Add user reducer here
    },

    // Adding the API middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, bundleApi.middleware, cardApi.middleware,llmModelApi.middleware,subscriptionApi.middleware),
});
/* eslint-enable */