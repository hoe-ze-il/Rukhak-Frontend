import { apiSlice } from "@/utils/apiSlice";

export const PostApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (pageNumber) => `/community/?limit=5&page=${pageNumber}`,
      transformResponse: (response) => {
        console.log(response);
        return {
          data: response.data.docs,
          metadata: { ...response.data.metadata },
        };
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        if (error && error.status === 404) return [];
        return [
          { type: "community", id: "LIST" },
          ...result.data.map((post) => ({
            type: "community",
            id: post._id,
          })),
        ];
      },
    }),

    getPost: builder.query({
      query: (id) => `/community/${id}`,
    }),
    createPost: builder.mutation({
      query: (data) => {
        return {
          url: "/community",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["community"],
    }),

    reactPost: builder.mutation({
      query: ({ postId, userId }) => {
        return {
          url: `/community/${postId}`,
          method: "PATCH",
          body: { userId },
        };
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "community", id: postId },
      ],
    }),

    deletePost: builder.mutation({
      query: (postId) => {
        return { url: `/community/${postId}`, method: "DELETE" };
      },
      invalidatesTags: ["community"],
    }),

    getPersonalPost: builder.query({
      query: (userId) => {
        return { url: `/users/${userId}/media` };
      },
      providesTags: "community",
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useReactPostMutation,
  useDeletePostMutation,
  useGetPersonalPostQuery,
} = PostApi;
