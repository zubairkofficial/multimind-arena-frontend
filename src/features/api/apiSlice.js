import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Helpers from "../../Config/Helpers";

// Define your API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: Helpers.apiUrl }),
    tagTypes: ["User"], // Define the tag types

    endpoints: (builder) => ({
        // Register user
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "user/register",
                method: "POST",
                body: newUser,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["User"], // Optionally invalidate the "User" tag if needed
        }),

        // Login user
        login: builder.mutation({
            query: (credentials) => ({
                url: "user/login",
                method: "POST",
                body: credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["User"], // Invalidate user data after login
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
            invalidatesTags: ["User"], // Invalidate user cache when user data is updated
        }),

        // Get user by ID
        getUserById: builder.query({
            query: (userId) => ({
                url: `user/${userId}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            providesTags: ["User"], // Provide the "User" tag for caching
        }),

        // Forgot Password
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "user/forget-password",
                method: "POST",
                body: { email },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        // Reset Password
        resetPassword: builder.mutation({
            query: ({ token, newPassword }) => ({
                url: "user/reset-password",
                method: "POST",
                body: { token, newPassword },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        // Get all users
        getAllUsers: builder.query({
            query: () => ({
                url: "user/all-users",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            providesTags: ["User"], // Provide the "User" tag for caching
        }),

        // Change Password
        changePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "user/change-password",
                method: "POST",
                body: { oldPassword, newPassword },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            invalidatesTags: ["User"], // Invalidate user data after changing the password
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useRegisterUserMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useGetUserByIdQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useGetAllUsersQuery,
} = apiSlice;