import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/expense" }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Expense"],
    }),
    createExpense: builder.mutation({
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
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
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
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
