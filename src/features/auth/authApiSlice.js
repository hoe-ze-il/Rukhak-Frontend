import { apiSlice } from "@/utils/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/email",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/google",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resendEmailActivate: builder.mutation({
      query: (email) => ({
        url: "/auth/resend/email-activation",
        method: "POST",
        body: email,
      }),
    }),
    activateAccount: builder.mutation({
      query: (token) => ({
        url: "/auth/account/activation",
        method: "POST",
        body: token,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot/password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset/password",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    resendEmailResetPWD: builder.mutation({
      query: (email) => ({
        url: "/auth/resend/email-reset-password",
        method: "POST",
        body: email,
      }),
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/resend/email-otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    signupSeller: builder.mutation({
      query: (sellerData) => ({
        url: "/auth/signup/seller",
        method: "PUT",
        body: { ...sellerData },
      }),
      invalidatesTags: () => ["User"],
    }),
    verifyTwoFactors: builder.mutation({
      query: (credential) => ({
        url: "/auth/verify/2FA",
        method: "POST",
        body: { ...credential },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          localStorage.clear();
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.status === "success") {
            dispatch(setCredentials({ user: data?.data.user }));
          }
        } catch (err) {
          console.error(err);
          localStorage.removeItem("persist");
          // If refresh fail, logout user!
          dispatch(authApiSlice.endpoints.logout.initiate());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useSignupMutation,
  useActivateAccountMutation,
  useResendEmailActivateMutation,
  useRefreshMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendEmailResetPWDMutation,
  useSignupSellerMutation,
  useVerifyTwoFactorsMutation,
  useResendOTPMutation,
} = authApiSlice;
