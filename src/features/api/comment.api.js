import { api } from "../../api/api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: ({ postId }) => `${postId}/comments`,
      providesTags: ["comments"],
    }),
    createComment: builder.mutation({
      query: ({ postId, data }) => {
        return {
          url: `${postId}/comments`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["comments"],
    }),
  }),
});

export const { useGetAllCommentsQuery, useCreateCommentMutation } = commentApi;
