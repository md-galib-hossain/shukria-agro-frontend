/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from "../tag-types";
import { TMeta } from "../../types/common";
import { baseApi } from "./baseApi";
import ICow from "@/types";

const cowApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCows: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/cow",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response:ICow[], meta: TMeta) => {
        return {
          cows: response,
          meta,
        };
      },
      providesTags: [TagTypes.cow],
    }),
    getAllCowsWithoutSpecific: build.query({
      query: (id:string | undefined)=>({
        url: `/cow/getallcowswithout/${id}`,
        method: "GET",
   
      })
    }),
    getSingleCow: build.query({
      query: (id: any) => {
        return {
          url: `/cow/${id}`,
          method: "GET",
        };
      },

      providesTags: [TagTypes.cow],
    }),
    createCow: build.mutation({
      query: (data) => ({
        url: "/cow",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.cow],

    }),
    softDeleteCow: build.mutation({
      query: (id: string) => ({
        url: `/cow/softdelete/${id}`,
        method: "PATCH",
        cache: "no-store",
      }),
      invalidatesTags: [TagTypes.cow],
    }),
    updateCow: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/cow/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [TagTypes.cow],
    }),
  }),
});

export const {
  useGetAllCowsQuery,
  useGetSingleCowQuery,
  useCreateCowMutation,
  useSoftDeleteCowMutation,
  useUpdateCowMutation,useGetAllCowsWithoutSpecificQuery
} = cowApi;
