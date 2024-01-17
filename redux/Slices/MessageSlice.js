import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MessageSlice = createApi({
  reducerPath: "Messages",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // return setUserAuthHeader(headers);
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    //run the assistant
    createMessage: builder.mutation({
      query: (data) => ({
        url: "/messages/",
        method: "POST",
        body: data,
      }),
    }),
    //get messages

    getMessage: builder.query({
      query: (threadId) => `/messages/?threadId=${threadId}`,
      providesTags: ["Messages"],
    }),
  }),
});

export const { 
    useCreateMessageMutation, 
    useLazyGetMessageQuery 
  } =MessageSlice;
