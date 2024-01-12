import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "@/utils/apiSlice";

const sellerAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = sellerAdapter.getInitialState({
  metaData: {
    totalResults: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeller: builder.query({
      query: ({ limit = 10, page = 1, sellerStatus, q }) => {
        const params = new URLSearchParams({
          limit,
          page,
          ...(sellerStatus && { sellerStatus }),
          ...(q && { q }),
        });
        return { url: "/admin/sellers", params };
      },
      transformResponse: (response, meta, arg) => {
        const { docs, metadata } = response.data;
        return {
          ...sellerAdapter.setAll(initialState, docs),
          metaData: metadata,
        };
      },
      providesTags: (result, error, arg) => {
        if (result && result.ids) {
          return [
            { type: "Seller", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Seller", id })),
          ];
        } else {
          // won't provide tags if the error status is 404
          return [];
        }
      },
    }),
    updateSellerStatus: builder.mutation({
      query: ({ sellerId, sellerStatus }) => ({
        url: `/admin/sellers/${sellerId}`,
        method: "PATCH",
        body: { sellerStatus },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Seller", id: arg.sellerId },
      ],
    }),
  }),
});

export const selectSellerResult = (state, _other, arg) =>
  extendedApiSlice.endpoints.getSeller.select(arg)(state);

// Create memoized selector
export const selectSellerData = createSelector(
  [selectSellerResult, (state, id, params) => ({ id, params })],
  (sellerResult) => {
    return sellerResult?.data ?? { ids: [], entities: {} };
  }
);

export const selectSellerMetaData = createSelector(
  [selectSellerResult, (state, params) => params],
  (sellerResult) => {
    return sellerResult?.data?.metaData ?? {};
  }
);

export const {
  selectAll: selectAllSeller,
  selectById: selectSellerById,
  selectIds: selectSellerId,
} = sellerAdapter.getSelectors(
  (state, id, params) => selectSellerData(state, id, params) ?? initialState
);

export const { useGetSellerQuery, useUpdateSellerStatusMutation } =
  extendedApiSlice;
