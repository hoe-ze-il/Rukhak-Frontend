import { apiSlice } from "@/utils/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/me/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        if (responseData?.data?.user?._doc) {
          const user = {
            ...responseData?.data.user._doc,
            sessions: responseData?.data.user.$$populatedVirtuals.sessions.sort(
              (a, b) => {
                const dateA = new Date(a.loginAt);
                const dateB = new Date(b.loginAt);
                return dateB - dateA;
              }
            ),
            addresses:
              responseData?.data.user.$$populatedVirtuals.addresses.sort(
                (a, b) => {
                  const dateA = new Date(a.createdAt);
                  const dateB = new Date(b.createdAt);
                  return dateB - dateA;
                }
              ),
            imageURL: responseData?.data.user.imageURL || undefined,
          };
          return user;
        }
        let user = responseData?.data.user;
        user.sessions.sort((a, b) => {
          const dateA = new Date(a.loginAt);
          const dateB = new Date(b.loginAt);
          return dateB - dateA;
        });
        user.addresses.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        return responseData?.data.user;
      },
      providesTags: () => ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/me/${data?.userId}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: () => ["User"],
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/upload/image",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: () => ["User"],
    }),
    confirmUpdateEmail: builder.mutation({
      query: (email) => ({
        url: "/users/confirm/email",
        method: "POST",
        body: email,
      }),
      invalidatesTags: () => ["User"],
    }),
    updateEmail: builder.mutation({
      query: (OTP) => ({
        url: "/users/update/email",
        method: "PATCH",
        body: OTP,
      }),
      invalidatesTags: () => ["User"],
    }),
    updatePassword: builder.mutation({
      query: (credential) => ({
        url: "/users/update/password",
        method: "PATCH",
        body: { ...credential },
      }),
      invalidatesTags: () => ["User"],
    }),
    toggleTwoFactorsByPwd: builder.mutation({
      query: (credential) => ({
        url: `/users/${credential?.action}/2FA/pwd`,
        method: "PATCH",
        body: { ...credential },
      }),
      invalidatesTags: () => ["User"],
    }),
    toggleTwoFactorsByOTP: builder.mutation({
      query: (data) => ({
        url: `/users/${data?.action}/2FA/oauth`,
        method: "GET",
      }),
      invalidatesTags: () => ["User"],
    }),
    StartEDTwoFactorsByOTP: builder.mutation({
      query: (credential) => ({
        url: `/users/${credential?.action}/2FA/otp`,
        method: "PATCH",
        body: { ...credential },
      }),
      invalidatesTags: () => ["User"],
    }),
    logoutOneDevice: builder.mutation({
      query: (data) => ({
        url: `/users/${data?.sessionId}/logout`,
        method: "DELETE",
      }),
      invalidatesTags: () => ["User"],
    }),
    deleteAccount: builder.mutation({
      query: (data) => ({
        url: `/users/me/${data?.userId}`,
        method: "DELETE",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUploadProfileImageMutation,
  useGetUserQuery,
  useConfirmUpdateEmailMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useToggleTwoFactorsByPwdMutation,
  useToggleTwoFactorsByOTPMutation,
  useStartEDTwoFactorsByOTPMutation,
  useLogoutOneDeviceMutation,
  useDeleteAccountMutation,
} = userApiSlice;
