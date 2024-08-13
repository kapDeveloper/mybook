import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/income" }),
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Income"],
    }),
    createIncome: builder.mutation({
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
      invalidatesTags: ["Income"], // Invalidate the cache of getIncomes
    }),
    updateIncome: builder.mutation({
      query: ({ id, formData }) => {
        if (formData.img) {
          formData.append("img", formData.img);
        }
        delete formData.img;

        return {
          url: `/${id}`,
          method: "PUT",
          body:
            formData instanceof FormData ? formData : JSON.stringify(formData),
          headers:
            formData instanceof FormData
              ? {}
              : { "Content-Type": "multipart/form-data" },
        };
      },
      invalidatesTags: ["Income"], // Invalidate the cache of getIncomes
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Income"], // Invalidate the cache of getIncomes
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
