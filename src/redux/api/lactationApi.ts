/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { TMeta } from "../../types/common";
import { baseApi } from "./baseApi";
import ILactation from "@/types";

const lactationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllLactations: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/lactation",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ILactation[], meta: TMeta) => {
        return {
          lactations: response,
          meta,
        };
      },
      providesTags: [TagTypes.lactation],
    }),
    getSingleLactation: build.query({
      query: (id: string) => ({
        url: `/lactation/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.lactation],
    }),
    createLactation: build.mutation({
      query: (data: ILactation) => ({
        url: "/lactation",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.lactation],
    }),
    updateLactation: build.mutation({
      query: ({ id, data }: { id: string; data: Partial<ILactation> }) => ({
        url: `/lactation/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [TagTypes.lactation],
    }),
    softDeleteLactation: build.mutation({
      query: (id: string) => ({
        url: `/lactation/softdelete/${id}`,
        method: "PATCH",
        cache: "no-store",
      }),
      invalidatesTags: [TagTypes.lactation],
    }),
  }),
});

export const {
  useCreateLactationMutation,
  useGetAllLactationsQuery,
  useGetSingleLactationQuery,
  useSoftDeleteLactationMutation,
  useUpdateLactationMutation,
} = lactationApi;
