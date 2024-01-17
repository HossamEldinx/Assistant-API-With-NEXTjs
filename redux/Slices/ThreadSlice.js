import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ThreadSlice = createApi({
  reducerPath: "Thread",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {},
  }),
  tagTypes: ["Thread"],
  endpoints: (builder) => ({
    getThread: builder.query({
      query: (threadId) => `/thread/?threadId=${threadId}`,
      providesTags: ["Thread"],
    }),

    createAndRunThread: builder.mutation({
      query: (data) => ({
        url: "/thread/create",
        method: "POST",
   
      }),
    }),
    //run the assistant
    createThread: builder.mutation({
      query: (data) => ({
        url: "/thread/",
        method: "POST",
        body: data,
      }),
    }),

    //post for create assistant
    runThread: builder.mutation({
      query: (data) => ({
        url: "/thread/run",
        method: "POST",
        body: data,
      }),
    }),

    //delete the thread using it thread id
    deleteThread: builder.mutation({
      query: (id) => ({
        url: `/assistant/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateThreadMutation,
  useLazyGetThreadQuery,
  useRunThreadMutation,
  useDeleteThreadMutation,
  useCreateAndRunThreadMutation
} = ThreadSlice;
