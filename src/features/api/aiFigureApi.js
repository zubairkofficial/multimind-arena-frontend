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
                url: "ai-figures",
                method: "POST",
                body: newAIFigure,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
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
                body: updatedAIFigure,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllAIFiguresQuery,
    useAddAIFigureMutation,
    useDeleteAIFigureMutation,
    useUpdateAIFigureMutation,
} = aiFigureApi;