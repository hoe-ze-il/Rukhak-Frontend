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
      query: (newReview) => ({
        url: `/products/${newReview.productId}/reviews`,
        method: "POST",
        body: {
          rating: newReview.rating,
          review: newReview.review,
        },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useCreateReviewMutation } =
  extendedApiSlice;
