import { apiSlice } from "@/utils/apiSlice";
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => {
        const url = `/seller/orders`;
        return url;
      },
      providesTags: ["Order"],
    }),
    getUserOrder: builder.query({
      query: () => {
        const url = `/users/order`;
        return url;
      },
      providesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (orderId) => {
        const url = `/seller/orders/${orderId}`;
        return url;
      },
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/seller/orders/${orderId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: () => ["Order"],
    }),
    chartOrder: builder.query({
      query: () => {
        const url = `/seller/ChartOrder`;
        return url;
      },
      providesTags: ["Order"],
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useChartOrderQuery,
  useGetUserOrderQuery
} = extendedApiSlice;