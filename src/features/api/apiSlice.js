import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Helpers from "../../Config/Helpers";

// Define your API slice
export const apiSlice = createApi({
    reducerPath: "api", // Optional, defaults to 'api'
    baseQuery: fetchBaseQuery({ baseUrl: Helpers.apiUrl }), // Main base URL for your API
    endpoints: (builder) => ({
        // Register user
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "user/register",
                method: "POST",
                body: newUser,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
        // Login user
        login: builder.mutation({
            query: (credentials) => ({
                url: "user/login", // Replace with your actual login endpoint
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
        // Login with Google
        loginWithGoogle: builder.mutation({
            query: (token) => ({
                url: `http://192.168.18.5:8080/user/auth/google?token=${token}`, // Google auth endpoint without /api/v1
                method: "GET", // GET method for Google login
            }),
        }),
        // Update user
        updateUser: builder.mutation({
            query: (userData) => ({
                url: "user/update",
                method: "PUT",
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
        // Get all users
        getAllUsers: builder.query({
            query: () => ({
                url: "user/",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useRegisterUserMutation,
    useLoginMutation,
    useLoginWithGoogleMutation,
    useUpdateUserMutation, // Export the update user hook
    useGetAllUsersQuery, // Export the get all users hook
} = apiSlice;