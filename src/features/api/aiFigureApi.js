// src/features/api/aiFigureApi.js

import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";

export const aiFigureApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all AI figures
        getAllAIFigures: builder.query({
            query: () => ({
                url: "ai-figures",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Add new AI figure
        addAIFigure: builder.mutation({
          query: (newAIFigure) => ({
            url: 'ai-figures',
            method: 'POST',
            body: newAIFigure,
            headers: {
              Authorization: `Bearer ${Helpers.getItem('token')}`, // Only include the Authorization header
            },
          }),
        }),

        // Delete an AI figure
        deleteAIFigure: builder.mutation({
            query: (figureId) => ({
                url: `ai-figures/${figureId}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Update AI figure
        updateAIFigure: builder.mutation({
            query: ({ figureId, updatedAIFigure }) => ({
              url: `ai-figures/${figureId}`,
              method: "PUT",
              body: updatedAIFigure, // Pass FormData directly
              headers: {
                Authorization: `Bearer ${Helpers.getItem("token")}`,
                // Do not manually set Content-Type here
              },
            }),
          }),
        getAIFigureById: builder.query({
            query: (id) => ({
              url: `ai-figures/${id}`,
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Helpers.getItem("token")}`,
              },
            }),
            transformResponse: (response) => response,  // You can add any transformations if needed
          }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllAIFiguresQuery,
    useGetAIFigureByIdQuery,
    useAddAIFigureMutation,
    useDeleteAIFigureMutation,
    useUpdateAIFigureMutation,
} = aiFigureApi;