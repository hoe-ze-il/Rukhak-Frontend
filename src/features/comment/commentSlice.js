import { apiSlice } from "@/utils/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: (postId) => `/community/${postId}/comments`,
      providesTags: ["Comments"],
      transformResponse: (response) => {
        return response?.doc;
      },
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: `/community/${commentData.get("postId")}/comments`,
        method: "POST",
        body: commentData,
        headers: {
          "Content-Type": undefined,
        },
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentData) => ({
        url: `/community/${commentData.postId}/comments/${commentData.commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    reactComment: builder.mutation({
      query: (commentData) => ({
        url: `/community/${commentData.postId}/comments/${commentData.commentId}/react`,
        method: "PATCH",
      }),
      invalidatesTags: ["Comments"],
    }),
    editComment: builder.mutation({
      query: (commentData) => ({
        url: `/community/${commentData.postId}/comments/${commentData.commentId}`,
        method: "PATCH",
        body: {
          content: commentData.content,
        },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useReactCommentMutation,
  useEditCommentMutation,
} = extendedApiSlice;
