import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Helpers from "../../Config/Helpers";
import { setUser } from "../userSlice"; // Import setUser action

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
                },
            }),
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Data will be user object after successful login
                    dispatch(setUser(data.user)); // Dispatch the action to set the user data
                    Helpers.setItem("user", JSON.stringify(data.user));
                    Helpers.setItem("token", data.token);
                } catch (error) {
                    console.error("Error logging in user:", error);
                }
            },
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    Helpers.setItem("user", JSON.stringify(data));
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            },
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                    Helpers.setItem("user", JSON.stringify(data));
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            },
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // You can handle data as needed, for example, storing in local state
                    console.log("Fetched all users:", data);
                } catch (error) {
                    console.error("Error fetching all users:", error);
                }
            },
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
    useGetAllUsersQuery, // Export the hook for getting all users
} = apiSlice;