/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVaccine } from "@/types";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types/common";
import { TagTypes } from "../tag-types";

const vaccineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVaccines: build.query({
      query: (args: Record<string, any>) => ({
        url: "/vaccine",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: IVaccine[], meta: TMeta) => {
        return { vaccines: response, meta };
      },
      providesTags: [TagTypes.vaccine],
    }),
    getSingleVaccine: build.query({
      query: (id: string) => ({
        url: `/vaccine/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.vaccine],
    }),
    createVaccine: build.mutation({
      query: (data: IVaccine) => ({
        url: "/vaccine",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.vaccine],
    }),
    updateVaccine: build.mutation({
      query: ({ id, data }: { id: string; data: Partial<IVaccine> }) => ({
        url: `/vaccine/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [TagTypes.vaccine],
    }),
    softDeleteVaccine: build.mutation({
      query: (id: string) => ({
        url: `/vaccine/softdelete/${id}`,
        method: "PATCH",
        cache: "no-store",
      }),
      invalidatesTags: [TagTypes.vaccine],
    }),
  }),
});

export const {
 useCreateVaccineMutation,useGetAllVaccinesQuery,useGetSingleVaccineQuery,useSoftDeleteVaccineMutation,useUpdateVaccineMutation
} = vaccineApi;

export default vaccineApi;
