import { apiSlice } from "@/utils/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ userId }) => {
        const url = userId ? `/users/${userId}/notification` : "/notifications";
        return url;
      },
      providesTags: ["Notification"],
    }),
    patchNotification: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notification/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery, usePatchNotificationMutation } =
  extendedApiSlice;
