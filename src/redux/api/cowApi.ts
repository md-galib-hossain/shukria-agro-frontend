/* eslint-disable @typescript-eslint/no-explicit-any */
import { TagTypes } from '../tag-types';
import { TMeta } from '../../types/common';
import { baseApi } from "./baseApi";

const cowApi = baseApi.injectEndpoints({
    endpoints: (build)=>({
        getAllCows: build.query({
            query: (arg: Record<string,any>)=>({
                url: "/cow",
                method: "GET",
                params: arg
            }),
            transformResponse: (response,meta:TMeta)=>{
                return {
                    cows: response,
                    meta
                }
            },
            providesTags: [TagTypes.cow]
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

    }),
    
})

export const {useGetAllCowsQuery,useGetSingleCowQuery} = cowApi