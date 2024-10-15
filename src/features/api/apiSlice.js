import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Helpers from '../../Config/Helpers';

// Define your API slice
export const apiSlice = createApi({
    reducerPath: 'api', // Optional, defaults to 'api'
    baseQuery: fetchBaseQuery({ baseUrl: Helpers.apiUrl }), // Main base URL for your API
    endpoints: (builder) => ({
        // Fetch users
        getUsers: builder.query({
            query: () => 'users',
        }),
        // Register user
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: 'user/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        // Login user
        login: builder.mutation({
            query: (credentials) => ({
                url: 'user/login', // Replace with your actual login endpoint
                method: 'POST',
                body: credentials,
            }),
        }),
        // Login with Google
        loginWithGoogle: builder.mutation({
            query: (token) => ({
                url: `http://192.168.18.5:8080/user/auth/google?token=${token}`, // Google auth endpoint without /api/v1
                method: 'GET', // GET method for Google login
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useLoginWithGoogleMutation // Export the Google auth hook
} = apiSlice;