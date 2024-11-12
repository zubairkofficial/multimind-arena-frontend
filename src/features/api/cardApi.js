// src/features/api/cardApi.js
import Helpers from "../../Config/Helpers";
import apiSlice from "./apiSlice";

export const cardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Card
    createCard: builder.mutation({
      query: (cardDetails) => ({
        url: "card/create-card",
        method: "POST",
        body: cardDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Get All User's Cards
    getAllCards: builder.query({
      query: () => ({
        url: "card/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Select Card with Price and Coins
    selectCard: builder.mutation({
      query: ({ cardId, price, coins }) => ({
        url: `card/existing-card`,
        method: "POST",
        body: { cardId, price, coins },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Delete Card (if needed)
    deleteCard: builder.mutation({
      query: (cardId) => ({
        url: `card/delete/${cardId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Helpers.getItem("token")}`,
        },
      }),
    }),

    // Update Card (if needed)
    updateCard: builder.mutation({
      query: ({ cardId, cardDetails }) => ({
        url: `card/update/${cardId}`,
        method: "PUT",
        body: cardDetails,
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
  useCreateCardMutation,
  useGetAllCardsQuery,
  useSelectCardMutation, // New hook for selecting a card with price and coins
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardApi;
