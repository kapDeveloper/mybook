import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/income" }),
  endpoints: (builder) => ({
    // GET request - fetch all incomes
    getIncomes: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    // POST request - create new income
    createIncome: builder.mutation({
      query: (formData) => {
        // Check if the image file exists
        if (formData.imgFile) {
          formData.append("img", formData.imgFile);
        }
        // Remove imgFile from the formData object if it exists
        delete formData.imgFile;

        return {
          url: "/",
          method: "POST",
          body: formData,
        };
      },
    }),
    // PUT request - update an existing income
    updateIncome: builder.mutation({
      query: ({ id, formData }) => {
        // Check if the image file exists
        if (formData.imgFile) {
          formData.append("img", formData.imgFile);
        }
        // Remove imgFile from the formData object if it exists
        delete formData.imgFile;

        return {
          url: "/",
          method: "PUT",
          body: formData,
        };
      },
    }),
    // DELETE request - delete an income by ID
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: "/",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetIncomesQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
