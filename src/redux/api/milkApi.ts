/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMilk } from "@/types";
import { baseApi } from "./baseApi";
import { TMeta } from "@/types/common";
import { TagTypes } from "../tag-types";

const milkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMilk: build.query({
      query: (args: Record<string, any>) => ({
        url: "/milk",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: IMilk[], meta: TMeta) => {
        return { milk: response, meta };
      },
      providesTags: [TagTypes.vaccine],
    }),
    getSingleMilk: build.query({
      query: (id: string) => ({
        url: `/milk/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.milk],
    }),
    createMilk: build.mutation({
      query: (data: IMilk) => ({
        url: "/milk",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.milk],
    }),
    updateMilk: build.mutation({
      query: ({ id, data }: { id: string; data: Partial<IMilk> }) => ({
        url: `/milk/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [TagTypes.milk],
    }),
    softDeleteMilk: build.mutation({
      query: (id: string) => ({
        url: `/milk/softdelete/${id}`,
        method: "PATCH",
        cache: "no-store",
      }),
      invalidatesTags: [TagTypes.milk],
    }),
  }),
});

export const {
  useCreateMilkMutation,
  useGetAllMilkQuery,
  useGetSingleMilkQuery,
  useSoftDeleteMilkMutation,
  useUpdateMilkMutation,
} = milkApi;

export default milkApi;
