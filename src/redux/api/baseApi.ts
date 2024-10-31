import { axiosBaseQuery } from "@/helpers/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TagTypeList } from "../tag-types";


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}` }),
  endpoints: () => ({
   
  
  }),
  tagTypes : TagTypeList
})

