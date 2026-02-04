import { ServiceOffering } from "@/types/service";
import baseAPI from "../baseAPI";

interface responseServices {
  data: ServiceOffering[];
  status: number;
}

export const servicesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<responseServices, void>({
      query: () => "/services",
      providesTags: ["Services"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetServicesQuery } = servicesApi;
