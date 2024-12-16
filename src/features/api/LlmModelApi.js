// src/features/api/llmModelApi.js

import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";

export const llmModelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all LLM models
    getAllLlmModels: builder.query({
      query: () => ({
        url: "llm-model",  // Endpoint for fetching all LLM models
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Get a specific LLM model by ID
    getLlmModelById: builder.query({
      query: (id) => ({
        url: `llm-model/${id}`,  // Endpoint for fetching a specific LLM model by ID
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Create a new LLM Model
    createLlmModel: builder.mutation({
      query: (newLlmModel) => ({
        url: "llm-model",  // Endpoint for creating a new LLM model
        method: "POST",
        body: newLlmModel,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Update an existing LLM Model
    updateLlmModel: builder.mutation({
      query: ({ id, updatedModel }) => ({
        url: `llm-model/${id}`,  // Endpoint for updating an LLM model
        method: "PUT",
        body: updatedModel, // Send updated data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),
    

    // Delete an LLM Model
    deleteLlmModel: builder.mutation({
      query: (id) => ({
        url: `llm-model/${id}`,  // Endpoint for deleting an LLM model
        method: "DELETE",
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
  useGetAllLlmModelsQuery,
  useGetLlmModelByIdQuery,
  useCreateLlmModelMutation,
  useUpdateLlmModelMutation,
  useDeleteLlmModelMutation,
} = llmModelApi;
