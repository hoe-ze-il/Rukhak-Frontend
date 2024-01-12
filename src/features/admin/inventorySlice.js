import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "@/utils/apiSlice";

const inventoryAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

const initialState = inventoryAdapter.getInitialState({
  metaData: {
    totalResults: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query({
      query: ({
        limit = 10,
        page = 1,
        unitPriceGte,
        unitPriceLte,
        categories,
        sort,
        status,
        q,
      }) => {
        const params = new URLSearchParams({
          limit,
          page,
          "unitPrice[gte]": unitPriceGte,
          "unitPrice[lte]": unitPriceLte,
          ...(categories && { categories }),
          ...(sort && { sort }),
          ...(status && { status }),
          ...(q && { q }),
        });
        return { url: "/admin/products", params };
      },
      transformResponse: (response, meta, arg) => {
        const { docs, metadata } = response.data;
        return {
          ...inventoryAdapter.setAll(initialState, docs),
          metaData: metadata,
        };
      },
      providesTags: (result, error, arg) => {
        if (result && result.ids) {
          return [
            { type: "Inventory", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Inventory", id })),
          ];
        } else {
          // not provide tags if the error status is 404
          return [];
        }
      },
    }),
    getInventoryById: builder.query({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: (result, error, arg) => [{ type: "Inventory", id: arg }],
    }),
    createProduct: builder.mutation({
      query: (inputData) => ({
        url: "/admin/products",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: [{ type: "Inventory", id: "LIST" }],
    }),
    editProduct: builder.mutation({
      query: ({ productId, inputData }) => ({
        url: `/admin/products/${productId}`,
        method: "PATCH",
        body: inputData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Inventory", id: arg.productId },
      ],
    }),
  }),
});

export const selectInventoryResult = (state, _other, arg) =>
  extendedApiSlice.endpoints.getInventory.select(arg)(state);

// Create memoized selector
export const selectInventoryData = createSelector(
  [selectInventoryResult, (state, id, params) => ({ id, params })],
  (inventoryResult) => {
    return inventoryResult?.data ?? { ids: [], entities: {} };
  }
);

export const selectInventoryMetaData = createSelector(
  [selectInventoryResult, (state, params) => params],
  (inventoryResult) => {
    return inventoryResult?.data?.metaData ?? {};
  }
);

export const {
  selectAll: selectAllInventory,
  selectById: selectInventoryById,
  selectIds: selectInventoryIds,
} = inventoryAdapter.getSelectors(
  (state, id, params) => selectInventoryData(state, id, params) ?? initialState
);

export const {
  useGetInventoryQuery,
  useGetInventoryByIdQuery,
  useCreateProductMutation,
  useEditProductMutation,
} = extendedApiSlice;
