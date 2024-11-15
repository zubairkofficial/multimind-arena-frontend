import Helpers from "../../Config/Helpers";
import apiSlice from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
            providesTags: (result, error, userId) => [{ type: "User", id: userId }], // Provide the tag with user ID for caching
        }),

        // Update user profile
        updateUser: builder.mutation({
            query: (userData) => ({
                url: `user/update`, // Assuming the user ID is part of the userData object
                method: "PUT",
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            invalidatesTags: (result, error, userData) => [{ type: "User", id: userData.id }], // Invalidate cache for this user ID
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
            providesTags: ["User"], // Provide the "User" tag for caching all users
        }),

        // Get user transaction history
        getUserTransactionHistory: builder.query({
            query: () => ({
                url: "user/transaction/history", // Endpoint to get the transaction history
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            providesTags: ["UserTransactions"], // Tag for caching transaction data
        }),
        createArenaRequest: builder.mutation({
            query: (userId) => ({
              url: "user/request-arena", // The endpoint for requesting an arena
              method: "POST",
              body: { userId }, // Send userId in the request body
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Helpers.getItem("token")}`,
              },
            }),
            }),
        updateArenaRequestStatus: builder.mutation({
                query: ({ userId, newStatus }) => ({
                  url: `user/update-request-status/${userId}`,  // The correct endpoint URL
                  method: "PUT",
                  body: { status: newStatus },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                  },
                }),
              }),
              getUsersWithPendingStatus: builder.query({
                query: () => ({
                    url: "user/pending-status",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Helpers.getItem("token")}`,
                    },
                }),
                providesTags: ["User"], // Tag for caching pending status users
            }),
       
    }),
    
    
});

// Export hooks for usage in components
export const {
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useGetAllUsersQuery,
    useCreateArenaRequestMutation,
    useGetUserTransactionHistoryQuery, // Export the hook for user transaction history
    useUpdateArenaRequestStatusMutation,
    useGetUsersWithPendingStatusQuery
} = userApi;
