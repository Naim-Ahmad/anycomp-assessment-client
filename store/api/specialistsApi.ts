import baseAPI from "../baseAPI";

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
export const specialistsAPI = baseAPI.injectEndpoints({
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

        return `/specialists?${params.toString()}`;
      },
      providesTags: ["Specialists"],
    }),

    /* -------- single specialist -------- */
    getSpecialistById: builder.query<
      {
        data: {
          id: string;
          title: string;
          description: string;
          estimatedDays: number;
          price: number;
          offerings: string[];
        };
      },
      string
    >({
      query: (id) => `/specialists/${id}`,
    }),

    /* -------- CREATE -------- */
    createSpecialist: builder.mutation<
      { message: string },
      {
        title: string;
        description: string;
        estimatedDays: number;
        price: number;
        offerings: string[];
        images?: File[];
      }
    >({
      query: (body) => {
        const formData = new FormData();

        formData.append("title", body.title);
        formData.append("description", body.description);
        formData.append("estimatedDays", String(body.estimatedDays));
        formData.append("price", String(body.price));
        formData.append("offerings", JSON.stringify(body.offerings));

        body.images?.forEach((file) => {
          formData.append("images", file);
        });

        return {
          url: "/specialists",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Specialists"],
    }),

    /* -------- UPDATE -------- */
    updateSpecialist: builder.mutation<
      { message: string },
      {
        id: string;
        data: {
          title: string;
          description: string;
          estimatedDays: number;
          price: number;
          offerings: string[];
          images?: File[];
        };
      }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("estimatedDays", String(data.estimatedDays));
        formData.append("price", String(data.price));
        formData.append("offerings", JSON.stringify(data.offerings));

        data.images?.forEach((file) => {
          formData.append("images", file);
        });

        return {
          url: `/specialists/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Specialists"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSpecialistsQuery,
  useGetSpecialistByIdQuery,
  useCreateSpecialistMutation,
  useUpdateSpecialistMutation,
} = specialistsAPI;
