// src/features/api/authApi.js
import Helpers from "../../Config/Helpers";
import apiSlice from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
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
            invalidatesTags: ["User"], // Invalidate cache on password change
        }),
    }),
});

// Export hooks for usage in components
export const {
    useRegisterUserMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;