import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Helpers from "../Config/Helpers";

// Define your arena API slice
export const arenaSlice = createApi({
    reducerPath: "api", // Optional, defaults to 'api'
    baseQuery: fetchBaseQuery({ baseUrl: Helpers.apiUrl }), // Main base URL for your API
    // Tags used for cache invalidation
    endpoints: (builder) => ({
        // Get all arenas
        getAllArenas: builder.query({
            query: () => ({
                url: "arena",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            // Use this tag to invalidate cached data when arenas are added or deleted
        }),

        // Add new arena
        addArena: builder.mutation({
            query: (newArena) => ({
                url: "arena",
                method: "POST",
                body: newArena,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Delete an arena
        deleteArena: builder.mutation({
            query: (arenaId) => ({
                url: `arena/${arenaId}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            // Invalidate arenas cache to refresh the data
        }),

        // Get all arena types
        getAllArenaTypes: builder.query({
            query: () => ({
                url: "arena-types/all",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            //Use this tag to invalidate cached data when arena types are added or deleted
        }),

        // Add new arena type
        addArenaType: builder.mutation({
            query: (newArenaType) => ({
                url: "arena-types/create",
                method: "POST",
                body: newArenaType,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Delete an arena type
        deleteArenaType: builder.mutation({
            query: (arenaTypeId) => ({
                url: `arena-types/delete/${arenaTypeId}`,
                method: "DELETE",
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
    useGetAllArenasQuery,
    useAddArenaMutation,
    useDeleteArenaMutation,
    useGetAllArenaTypesQuery,
    useAddArenaTypeMutation,
    useDeleteArenaTypeMutation,
} = arenaSlice;