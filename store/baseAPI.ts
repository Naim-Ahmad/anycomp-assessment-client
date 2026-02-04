import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
  }),
  tagTypes: ["Specialists", "Services"],
  endpoints: () => ({}),
});

export default baseAPI;
