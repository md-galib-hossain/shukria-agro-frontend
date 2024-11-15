/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";
import { TagTypes } from "../tag-types";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories : build.query({
            query: (arg: Record<string,any>)=>({
                url: "/category",
                method: "GET",
                params: arg,
            }),
            // transformResponse: (response:ICategory[]) => {
            //     return {
            //         categories: response,
            
            //     };
            //   },
              providesTags: [TagTypes.category],
        }),
        createCowCategory: build.mutation({
            query: (data) => ({
              url: "/category",
              method: "POST",
              data,
            }),
            invalidatesTags: [TagTypes.category],
      
          }),
    })
})

export const {useGetAllCategoriesQuery,useCreateCowCategoryMutation} = categoryApi