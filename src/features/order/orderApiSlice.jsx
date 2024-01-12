import { apiSlice } from "@/utils/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: () => ["Order"],
    }),
    getOrder: builder.query({
      query: () => {
        const url = `/orders?status=delivered`;
        return url;
      },
      providesTags: ["Order"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
     }),
     
  }),
});

export const { useOrderMutation, useGetOrderQuery, useGetProductByIdQuery } = orderApiSlice;
