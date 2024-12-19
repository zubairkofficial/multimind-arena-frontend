import apiSlice from "./apiSlice"; // Use your existing apiSlice setup
import Helpers from "../../Config/Helpers";

export const aiFigureTypeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all AI figure types
        getAllAifigureTypes: builder.query({
            query: () => ({
                url: "aifigure-types",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Add new AI figure type
        addAifigureType: builder.mutation({
            query: (newAifigureType) => ({
                url: "aifigure-types",
                method: "POST",
                body: newAifigureType,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Delete an AI figure type
        deleteAifigureType: builder.mutation({
            query: (aifigureType) => ({
                url: `aifigure-types/${aifigureType}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Update AI figure type
        updateAifigureType: builder.mutation({
            query: ({ aifigureType, updatedAifigureType }) => ({
                url: `aifigure-types/${aifigureType}`,
                method: "PUT",
                body: updatedAifigureType,
                headers: {
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
        }),

        // Get AI figure type by ID
        getAifigureTypeById: builder.query({
            query: (id) => ({
                url: `aifigure-types/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Helpers.getItem("token")}`,
                },
            }),
            transformResponse: (response) => response, // Add transformations if needed
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllAifigureTypesQuery,
    useAddAifigureTypeMutation,
    useDeleteAifigureTypeMutation,
    useUpdateAifigureTypeMutation,
    useGetAifigureTypeByIdQuery,
} = aiFigureTypeApi;
