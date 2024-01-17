import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AssistantSlice = createApi({
  reducerPath: "Assistant",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // return setUserAuthHeader(headers);
    },
  }),
  tagTypes: ["Assistant"],
  endpoints: (builder) => ({
    getTesting: builder.query({
      query: () => `/testing`,
      providesTags: ["CHAT"],
    }),
    getAllAssitants: builder.query({
      query: () => `/assistant/list`,
      providesTags: ["CHAT"],
    }),
    //run the assistant
    runAssistant: builder.mutation({
      query: (data) => ({
        url: "/assistant/run/",
        method: "POST",
        body: data,
      }),
    }),

    //post for create assistant
    createAssistant: builder.mutation({
      query: (data) => ({
        url: "/assistant/",
        method: "POST",
        body: data,
      }),
    }),

    //get assistant using id
    getAssistnt: builder.query({
      query: (assistantId) => `/${assistantId}`,
      providesTags: ["Assistant"],
    }),

    //delete the assistant using it assistant id
    deleteAssistant: builder.mutation({
      query: (id) => ({
        url: `/assistant/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useRunAssistantMutation,
  useLazyGetAllAssitantsQuery,
  useLazyGetTestingQuery,
  useCreateAssistantMutation,
  useDeleteAssistantMutation,
  useLazyGetAssistntQuery
 } = AssistantSlice;
