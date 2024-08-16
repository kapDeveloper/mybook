import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleIconApi = createApi({
  reducerPath: "singleIconApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/singleicon" }),
  tagTypes: ["SingleIcon"],
  endpoints: (builder) => ({
    getSingleIcons: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["SingleIcon"],
    }),
    createSingleIcon: builder.mutation({
      query: (formData) => {
        if (formData instanceof FormData) {
          return {
            url: "/",
            method: "POST",
            body: formData,
          };
        }

        return {
          url: "/",
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["SingleIcon"],
    }),
    updateSingleIcon: builder.mutation({
      query: ({ id, formData }) => {
        if (formData.img) {
          formData.append("img", formData.img);
        }
        delete formData.img;

        return {
          method: "PUT",
          body:
            formData instanceof FormData ? formData : JSON.stringify(formData),
          headers:
            formData instanceof FormData
              ? {}
              : { "Content-Type": "multipart/form-data" },
        };
      },
      invalidatesTags: ["SingleIcon"],
    }),
    deleteSingleIcon: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["SingleIcon"],
    }),
  }),
});

export const {
  useGetSingleIconsQuery,
  useCreateSingleIconMutation,
  useUpdateSingleIconMutation,
  useDeleteSingleIconMutation,
} = singleIconApi;
