// src/features/api/subscriptionApi.js
import Helpers from "../../Config/Helpers"; // Ensure Helpers is defined and accessible
import apiSlice from "./apiSlice"; // Ensure apiSlice is correctly configured

export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Subscription
    createSubscription: builder.mutation({
      query: (subscriptionDetails) => ({
        url: "subscriptions", // Ensure this matches your backend route
        method: "POST",
        body: subscriptionDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`, // Ensure Helpers.getItem works
        },
      }),
      invalidatesTags: ['Subscriptions'], // Invalidate cache for subscription queries
    }),

    // Create Subscription with New Card
    createSubscriptionWithNewCard: builder.mutation({
      query: (subscriptionWithCardDetails) => ({
        url: "subscriptions/new-card", // Matches new-card route in backend
        method: "POST",
        body: subscriptionWithCardDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`, // Ensure Helpers.getItem works
        },
      }),
      invalidatesTags: ['Subscriptions'], // Invalidate cache for subscription queries
    }),

    // Get All Subscriptions
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "subscriptions", // Ensure this matches your backend route
        method: "GET",
        headers: {
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
      providesTags: ['Subscriptions'], // Add caching tags
    }),

    // Get a Single Subscription by ID
    getSubscriptionById: builder.query({
      query: (id) => ({
        url: `subscriptions/${id}`, // Ensure this matches your backend route
        method: "GET",
        headers: {
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Subscriptions', id }], // Cache based on ID
    }),

    // Update Subscription
    updateSubscription: builder.mutation({
      query: ({ id, subscriptionDetails }) => ({
        url: `subscriptions/${id}`, // Ensure this matches your backend route
        method: "PUT",
        body: subscriptionDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Subscriptions', id }], // Invalidate cache for updated subscription
    }),

    // Delete Subscription
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `subscriptions/${id}`, // Ensure this matches your backend route
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Subscriptions', id }], // Invalidate cache for deleted subscription
    }),
    // Get All Subscriptions by User ID
getSubscriptionsByUserId: builder.query({
  query: (userId) => ({
    url: `subscriptions/join/${userId}`, // Match the backend route
    method: "GET",
    headers: {
      Authorization: `Bearer ${Helpers.getItem("token")}`, // Ensure token is provided
    },
  }),
  providesTags: (result, error, userId) => [{ type: 'Subscriptions', id: userId }], // Cache subscriptions by userId
}),

  }),
});

// Export hooks for usage in components
export const {
  useCreateSubscriptionMutation,
  useCreateSubscriptionWithNewCardMutation,
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetSubscriptionsByUserIdQuery
} = subscriptionApi;
