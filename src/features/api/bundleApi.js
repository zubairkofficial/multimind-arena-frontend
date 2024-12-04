// src/features/api/bundleApi.js

import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";

export const bundleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all bundles
        getAllBundles: builder.query({
            query: () => ({
                url: "package-bundles",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Add new bundle
        addBundle: builder.mutation({
            query: (newBundle) => ({
                url: "package-bundles",
                method: "POST",
                body: newBundle, // Ensure this is an object
                headers: {
                    "Content-Type": "application/json", // Set to application/json
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            invalidatesTags: ['Bundles'], // Invalidate bundles on addition
        }),

        // Delete a bundle
        deleteBundle: builder.mutation({
            query: (bundleId) => ({
                url: `package-bundles/${bundleId}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Update bundle
        updateBundle: builder.mutation({
            query: ({ bundleId, updatedBundle }) => {
                return {
                    url: `package-bundles/${bundleId}`,
                    method: "PUT",
                    body: updatedBundle,
                    headers: {
                        "Content-Type": "application/json", // Set to application/json for consistency
                        Authorization: `Bearer ${Helpers.getItem("token")}`,
                    },
                };
            },
            invalidatesTags: ['Bundles'], // Invalidate bundles on update
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllBundlesQuery,
    useAddBundleMutation,
    useDeleteBundleMutation,
    useUpdateBundleMutation,
} = bundleApi;
