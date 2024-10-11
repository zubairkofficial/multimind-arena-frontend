import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your API slice
export const apiSlice = createApi({
    reducerPath: 'api', // Optional, defaults to 'api'
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.18.5:8080/api/v1' }), // Replace with your base URL
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
    }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useRegisterUserMutation, useLoginMutation } = apiSlice;