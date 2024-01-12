import { apiSlice } from "@/utils/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = productsAdapter.getInitialState({
  metadata: {
    totalResults: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnProducts: builder.query({
      query: (url) => {
        return `/seller/products?${url}`;
      },
      transformResponse: (resData) => {
        return {
          ...productsAdapter.setAll(initialState, resData.data.docs),
          metadata: { ...resData.data.metadata },
        };
      },
      providesTags: (result, error, arg) => {
        if (result && result.ids)
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        else return [];
      },
    }),
    getProduct: builder.query({
      query: () => "/seller/products",
      transformResponse: (resData) => {
        return {
          ...productsAdapter.setAll(initialState, resData.data.docs),
          metadata: { ...resData.data.metadata },
        };
      },
      providesTags: (result, error, arg) => {
        if (result && result.ids)
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        else return [];
      },
    }),
    getOwnProductDetail: builder.query({
      query: (productId) => ({
        url: `/seller/products/${productId}`,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    deleteOwnProduct: builder.mutation({
      query: (productId) => ({
        url: `/seller/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    editOwnProduct: builder.mutation({
      query: ({ productId, inputData }) => ({
        url: `/seller/products/${productId}`,
        method: "PATCH",
        body: inputData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.productId },
      ],
    }),
    createOwnProduct: builder.mutation({
      query: (inputData) => ({
        url: "/seller/products",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOwnProductsQuery,
  useGetOwnProductDetailQuery,
  useDeleteOwnProductMutation,
  useEditOwnProductMutation,
  useGetProductQuery,
  useCreateOwnProductMutation,
} = extendedApiSlice;
