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

            getUsersWithAiFigurePendingStatus: builder.query({
                query: () => ({
                  url: "user/aifigure/pending-status", // Endpoint to fetch AI figure pending status users
                  method: "POST", // Assuming the backend expects a POST request
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`, // Assuming token is stored in Helpers
                  },
                }),
                providesTags: ["User"], // Provide a tag for caching the users with pending status
              }),
           

            getUserInfoCount: builder.query({
                query: (userId) => ({
                  url: `user/userInfo-count/${userId}`, // Backend endpoint
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`, // Assuming token is stored
                  },
                }),
                  }),
                  createAiFigureRequest: builder.mutation({
                    query: (userId) => ({
                      url: "user/request-aifigure", // Endpoint for requesting AI figure
                      method: "POST",
                      body: { userId },
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Helpers.getItem("token")}`,
                      },
                    }),
                  }),
                  logout: builder.mutation({
                    query: () => ({
                      url: 'user/logout',  // Assuming 'auth/logout' is the endpoint for logging out
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Helpers.getItem("token")}`,
                      },
                    }),
                    }),
                  updateAiFigureRequestStatus: builder.mutation({
                    query: ({ userId, status }) => ({
                      url: `user/update-aifigure-request/${userId}`, // Endpoint to update AI figure request status
                      method: "PUT",
                      body: { status }, // Send the new status in the body
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Helpers.getItem("token")}`, // Get the token from Helpers
                      },
                    }),
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
    useGetUsersWithPendingStatusQuery,
    useGetUserInfoCountQuery,
    useGetUsersWithAiFigurePendingStatusQuery,
    useUpdateAiFigureRequestStatusMutation,
    useCreateAiFigureRequestMutation,
    useLogoutMutation 
} = userApi;
