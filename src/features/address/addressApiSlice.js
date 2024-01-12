import { apiSlice } from "@/utils/apiSlice";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: () => ["User"],
    }),
    updateAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses/${data.id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: () => ["User"],
    }),
    deleteAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["User"],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApiSlice;
