// src/features/api/systemPromptApi.js

import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";

export const systemPromptApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all System Prompts
    getAllSystemPrompts: builder.query({
      query: () => ({
        url: "system-prompt",  // Endpoint for fetching all system prompts
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Get a specific System Prompt by ID
    getSystemPromptById: builder.query({
      query: (id) => ({
        url: `system-prompt/${id}`,  // Endpoint for fetching a specific system prompt by ID
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Create a new System Prompt
    createSystemPrompt: builder.mutation({
      query: (newSystemPrompt) => ({
        url: "system-prompt",  // Endpoint for creating a new system prompt
        method: "POST",
        body: newSystemPrompt,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Update an existing System Prompt
    updateSystemPrompt: builder.mutation({
      query: ({ id, updatedSystemPrompt }) => ({
        url: `system-prompt/${id}`,  // Endpoint for updating a system prompt
        method: "PUT",
        body: updatedSystemPrompt,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Delete a System Prompt
    deleteSystemPrompt: builder.mutation({
      query: (id) => ({
        url: `system-prompt/${id}`,  // Endpoint for deleting a system prompt
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
  useGetAllSystemPromptsQuery,
  useGetSystemPromptByIdQuery,
  useCreateSystemPromptMutation,
  useUpdateSystemPromptMutation,
  useDeleteSystemPromptMutation,
} = systemPromptApi;
