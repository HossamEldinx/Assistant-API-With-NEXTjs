import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DataSlice = createApi({
  reducerPath: "Data",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // return setUserAuthHeader(headers);
    },
  }),
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    //run the assistant
    uploadPdf: builder.mutation({
      query: (data) => ({
        url: "/data",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadPdfMutation } = DataSlice;
