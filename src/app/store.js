import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
/* eslint-disable no-underscore-dangle */
export const store = configureStore({

    reducer: {
        // Add the API slice reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
/* eslint-enable */