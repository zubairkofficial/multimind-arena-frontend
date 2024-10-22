// src/features/api/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Helpers from "../../Config/Helpers";

// Base API configuration
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: Helpers.apiUrl
    }),
    tagTypes: ["User"], // Common tag types that can be shared
    endpoints: () => ({}), // Empty, we'll extend this later
});

export default apiSlice;