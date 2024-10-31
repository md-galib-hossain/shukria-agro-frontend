// import { AxiosError, AxiosRequestConfig } from "axios";
// import { instance as axiosInstance } from "./axiosInstance";
// import { BaseQueryFn } from "@reduxjs/toolkit/query";
// import { TMeta } from "@/types/common";
// export const axiosBaseQuery =
//   ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<{
//     url: string;
//     method?: AxiosRequestConfig["method"];
//     data?: AxiosRequestConfig["data"];
  
//     params?: AxiosRequestConfig["params"];
//     headers?: AxiosRequestConfig["headers"];
//     meta?: TMeta;
//     contentType? : string 
//   }> =>
//   async ({ url, method, data, params, headers, contentType }) => {
//     try {
//       const result = await axiosInstance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers: {
//           "Content-Type": contentType || "application/json",
//         },
//       });
//       return result;
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

import { AxiosError, AxiosRequestConfig } from "axios";
import { instance as axiosInstance } from "./axiosInstance";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { TMeta } from "@/types/common";

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
    meta?: TMeta;
    contentType?: string;
  }> =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
          "Content-Type": contentType || "application/json",
        },
      });
      
      // Return only the `data` and `meta` fields as RTK Query expects `{ data: ... }`
      return { data: result.data?.data, meta: result.data?.meta };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
