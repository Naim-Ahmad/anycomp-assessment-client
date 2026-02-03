import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Specialist = {
  id: number;
  service_name: string;
  price: string;
  purchases: number;
  approval_status: "Approved" | "Under Review" | "Rejected";
  publish_status: "Published" | "Draft";
};

type SpecialistsResponse = {
  data: Specialist[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const specialistsApi = createApi({
  reducerPath: "specialistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Specialists"],
  endpoints: (builder) => ({
    getSpecialists: builder.query<
      SpecialistsResponse,
      {
        page: number;
        limit: number;
        tab: "all" | "drafts" | "published";
        search: string;
      }
    >({
      query: ({ page, limit, tab, search }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (tab === "drafts") params.append("tab", "draft");
        if (tab === "published") params.append("tab", "published");

        if (search && search.trim().length > 0) {
          params.append("search", search.trim());
        }

        return `/api/specialists?${params.toString()}`;
      },
      providesTags: ["Specialists"],
    }),
  }),
});

export const { useGetSpecialistsQuery } = specialistsApi;
