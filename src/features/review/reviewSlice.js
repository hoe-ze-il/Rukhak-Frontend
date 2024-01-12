import { apiSlice } from "@/utils/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: ["Review"],
      transformResponse: (response) => {
        return response.doc;
      },
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.productId}/reviews`,
        method: "POST",
        body: {
          rating: parseInt(data.rating),
          review: data.review,
        },
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    deleteReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.productId}/reviews/${data.reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    editReview: builder.mutation({
      query: (data) => ({
        url: `/products/${data.productId}/reviews/${data.reviewId}`,
        method: "PATCH",
        body: { rating: data.rating, review: data.review },
      }),
      invalidatesTags: ["Review", "Product"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
} = extendedApiSlice;
