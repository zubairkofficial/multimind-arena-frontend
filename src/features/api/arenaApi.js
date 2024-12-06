// src/features/api/arenaApi.js

import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";
export const arenaApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all arenas
        getAllArenas: builder.query({
            query: () => ({
                url: "arenas",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Add new arena
        addArena: builder.mutation({
            query: (newArena) => ({
                url: "arenas",
                method: "POST",
                body: newArena,
                headers: {
                    "Content-Type": "multipart/form-data",

                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),


        updateArena: builder.mutation({
            query: ({ id, updatedArena }) => ({
                url: `arenas/${id}`,
                method: "PUT",
                body: updatedArena,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Delete an arena
        deleteArena: builder.mutation({
            query: (arenaId) => ({
                url: `arenas/${arenaId}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
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

        // Update arena type
        updateArenaType: builder.mutation({
            query: ({ id, updatedArenaType }) => ({
                url: `arena-types/${id}`,
                method: "PUT",
                body: updatedArenaType,
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
        getArenaById: builder.query({
            query: (id) => ({
                url: `arenas/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),


        getArenaTypeById: builder.query({
            query: (id) => ({
                url: `arena-types/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Join an arena by sending the ID
        joinArena: builder.mutation({
            query: (arenaId) => ({
                url: `arenas/join-arena`,
                method: "POST",
                body: { arenaId: arenaId }, // Sending only the arena ID
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllArenasQuery,
    useAddArenaMutation,
    useDeleteArenaMutation,
    useGetAllArenaTypesQuery,
    useAddArenaTypeMutation,
    useDeleteArenaTypeMutation,
    useJoinArenaMutation, // Export the joinArena mutation hook
    useUpdateArenaMutation,
    useGetArenaByIdQuery,
    useUpdateArenaTypeMutation, // Add this export
    useGetArenaTypeByIdQuery // Add this export
} = arenaApi;