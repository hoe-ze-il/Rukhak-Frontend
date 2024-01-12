import { apiSlice } from "@/utils/apiSlice";

export const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowers: builder.query({
      query: ({ userId }) => {
        console.log(userId);
        return { url: `users/${userId}/media/network/getAllFollowers` };
      },
      providesTags: ["network"],
      // providesTags: (result, error) => {
      //   console.log(result);
      //   if (error && error.status === 404) return [];
      //   return [
      //     { type: "network", id: "LIST" },
      //     ...result.data.docs.map((net) => ({
      //       type: "network",
      //       id: net._id,
      //     })),
      //   ];
      // },
    }),
    getAllFollowing: builder.query({
      query: ({ userId }) => `users/${userId}/media/network/getAllFollowing`,
      providesTags: ["network"],
      // providesTags: (result, error) => {
      //   if (error && error.status === 404) return [];
      //   console.log(result);
      //   return [
      //     { type: "network", id: "LIST" },
      //     ...result.data.map((net) => ({
      //       type: "network",
      //       id: net._id,
      //     })),
      //   ];
      // },
    }),
    follow: builder.mutation({
      query: ({ userId, targetId }) => {
        return {
          url: `users/${userId}/media/network`,
          method: "POST",
          body: { targetId },
        };
      },
      invalidatesTags: ["network"],
    }),
  }),
});

export const {
  useGetAllFollowersQuery,
  useGetAllFollowingQuery,
  useFollowMutation,
} = followApi;
