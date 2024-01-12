import { Routes, Route } from "react-router-dom";

import "./App.scss";

import theme from "./theme/theme.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { ReviewContextProvider } from "./contexts/user/ReviewContext";
import { CategoriesContextProvider } from "./contexts/user/CategoryContext";
import { UserProvider } from "./contexts/user/UserContext";
import { SearchProductsContextProvider } from "./contexts/user/SearchContext";
import { CartProvider } from "./contexts/user/CartContext";
// Internal components
import Homepage from "./pages/Home/HomePage";
import ForumPage from "./pages/user/Forum/ForumPage";
import OrderHistory from "./pages/user/OrderHistory/OrderHistory";
import Cart from "./pages/user/Cart/Cart";
import CheckoutCart from "@/pages/user/Checkout/CheckoutCart";
import CheckoutBuyNow from "@/pages/user/Checkout/CheckoutBuyNow";
import AddressList from "@/pages/user/GeneralSetting/AddressList";
import PayPal from "@/pages/user/PayPal/PayPal";
import ConfirmOrder from "@/pages/user/ConfirmOrder/ConfirmOrder";
import RukhakBot from "./pages/user/RukhakBot/RukhakBot";
import GeneralSetting from "./pages/user/GeneralSetting/GeneralSetting";
import SettingLayout from "./components/setting/SettingLayout";
import HelpAndFeedback from "./pages/user/HelpAndFeedback/HelpAndFeedback";
import NotFound from "./pages/user/NotFound/NotFound";
import Notification from "./pages/user/Notification/Notification";
import ProductDetailsPage from "./pages/user/ProductDetails/ProductDetailsPage";
import Reviews from "./pages/user/Reviews/Reviews";
import AdminHome from "./pages/admin/AdminHome";
import CreateReview from "./pages/user/CreateReview/CreateReview";
import SignupMethod from "./pages/user/Signup/SignupMethod";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/user/Login/Login";
import SignupEmail from "./pages/user/SignupEmail/SignupEmail";
import PendingActivation from "./pages/user/PendingAvtivate/PendingActivate";
import SecuritySetting from "./pages/user/SecuritySetting/SecuritySetting";
import ProductListPage from "./pages/user/ProductList/ProductListPage";
import EditReview from "./pages/user/EditReview/EditReview";
import ActivateAccount from "./pages/user/ActivateAccount/ActivateAccount";
import ReactGA from "react-ga4";
import GeneralPageLayout from "./components/user/GeneralPageLayout";
import AdminLayout from "./components/admin/AdminLayout";
import Unauthorize from "./pages/user/Unauthorize/Unauthorize";
import CartLayout from "./components/cart/CartLayout";
import ForgotPassword from "./pages/user/ForgotPassword/ForgotPassword";
import PreventAuthPage from "./components/auth/PreventAuthPage";
import ResetPassword from "./pages/user/ResetPassword/ResetPassword";
import UnAuthSeller from "./pages/user/UnAuthSeller/UnAuthSeller";
import PendingResetPassword from "./pages/user/PendingResetPassword/PendingResetPassword";
import SignupSeller from "./pages/user/SignupSeller/SignupSeller";
import AuthGuard from "./components/auth/AuthGurd";
import SearchResult from "./pages/user/SearchProductsPage/SearchResult";
import SellerHome from "./pages/seller/SellerHome";
import Map from "./components/map/Map";
import PendingSeller from "./pages/user/PendingSeller/PendingSeller";
import Box from "@mui/material/Box";
import MapboxComponent from "./components/map/viewMap";
import NewEmail from "./pages/user/GeneralSetting/NewEmail";
import ConfirmOTP from "./pages/user/ConfirmOTP/ConfirmOTP";
import TempPost from "./pages/user/TempPost/TempPost";
import CommentPage from "./pages/user/Comments/CommentPage";
import EditAddress from "./pages/user/GeneralSetting/EditAddress";
import AddAddress from "./pages/user/GeneralSetting/AddAddress";
import ChangePassword from "./pages/user/ChangePassword/ChangePassword";
import EDTwoFactors from "./pages/user/EDTwoFactors/EDTwoFactors";
import ReasonDeleteAccount from "./pages/user/ReasonDeleteAccount/ReasonDeleteAccount";
import DeleteAccount from "./pages/user/DeleteAccount/DeleteAccount";
import Warpping from "./components/user/Warpping";

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID, {
  cookieDomain: "auto",
  debug: true,
});

// check if the current route is an admin route
const isAdminRoute = window.location.pathname.startsWith("/admin");

function App() {
  return (
    <ThemeProvider theme={!isAdminRoute ? theme : {}}>
      <AuthProvider>
        <CartProvider>
          <UserProvider>
            <SearchProductsContextProvider>
              <ReviewContextProvider>
                <CategoriesContextProvider>
                  <Warpping>
                    <Routes>
                      {/* Admin route */}
                      <Route element={<AdminLayout />}>
                        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
                          <Route path="/admin/*" element={<AdminHome />} />
                        </Route>
                        <Route
                          element={<AuthGuard allowedRoles={["seller"]} />}
                        >
                          <Route path="/seller/*" element={<SellerHome />} />
                        </Route>
                      </Route>

                      {/* Auth Route */}
                      <Route path="/auth" element={<AuthLayout />}>
                        {/* Prevent login user */}
                        <Route element={<PreventAuthPage />}>
                          <Route index element={<Login />} />
                          <Route path="signup" element={<SignupMethod />} />
                          <Route path="signup/form" element={<SignupEmail />} />
                          <Route
                            path="pending/activate"
                            element={<PendingActivation />}
                          />
                        </Route>
                        <Route
                          path="forgot-password"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="activate/:token"
                          element={<ActivateAccount />}
                        />
                        <Route path="unauthorize" element={<Unauthorize />} />
                        <Route
                          path="pending/reset-password"
                          element={<PendingResetPassword />}
                        />
                        <Route
                          path="reset-password/:resetToken"
                          element={<ResetPassword />}
                        />
                        <Route
                          path="pending/seller"
                          element={<PendingSeller />}
                        />
                        <Route
                          path="two-step-verification"
                          element={<ConfirmOTP isTwoFactors={true} />}
                        />

                        <Route element={<AuthGuard allowedRoles={["user"]} />}>
                          <Route
                            path="signup-seller/form"
                            element={<SignupSeller />}
                          />
                        </Route>
                      </Route>

                      {/* Setting Route */}
                      <Route path="/setting" element={<SettingLayout />}>
                        <Route element={<AuthGuard />}>
                          <Route index element={<GeneralSetting />} />
                          <Route
                            path="security"
                            element={<SecuritySetting />}
                          />
                          <Route path="update-email" element={<NewEmail />} />
                          <Route
                            path="confirm-otp/update-email"
                            element={<ConfirmOTP isUpdateEmail={true} />}
                          />
                          <Route
                            path="create-address"
                            element={<AddAddress />}
                          />
                          <Route
                            path="edit-address/:addressId"
                            element={<EditAddress />}
                          />
                        </Route>
                        <Route
                          path="edit-password"
                          element={<ChangePassword />}
                        />
                        <Route
                          path=":action/two-step-verification/password"
                          element={<EDTwoFactors />}
                        />
                        <Route
                          path=":action/two-step-verification/OTP"
                          element={<ConfirmOTP isEDTwoFactors={true} />}
                        />
                        <Route
                          path="reason-delete-account"
                          element={<ReasonDeleteAccount />}
                        />
                        <Route
                          path="delete-account"
                          element={<DeleteAccount />}
                        />
                      </Route>
                      <Route path="/rukhakbot/*" element={<RukhakBot />} />
                      <Route path="/" element={<GeneralPageLayout />}>
                        {/* Public Page */}
                        <Route index element={<Homepage />} />
                        <Route path="/store">
                          <Route index element={<ProductListPage />} />
                          <Route
                            path=":productId"
                            element={<ProductDetailsPage />}
                          />
                          <Route
                            path=":productId/reviews"
                            element={<Reviews />}
                          />
                          <Route element={<AuthGuard />}>
                            <Route
                              path=":productId/create-review"
                              element={<CreateReview />}
                            />
                            <Route
                              path=":productId/edit-review"
                              element={<EditReview />}
                            />
                          </Route>
                        </Route>
                        <Route path="/results" element={<SearchResult />} />
                        <Route path="/help/*" element={<HelpAndFeedback />} />
                        {/* Protected Route */}
                        <Route element={<AuthGuard />}>
                          <Route path="/temp-post">
                            <Route index element={<TempPost />} />
                            <Route
                              path=":commentId"
                              element={<CommentPage />}
                            />
                          </Route>
                          <Route
                            path="/notification"
                            element={<Notification />}
                          />

                          <Route
                            path="/orderhistory/*"
                            element={<OrderHistory />}
                          />
                          <Route
                            element={<AuthGuard allowedRoles={["user"]} />}
                          >
                            <Route
                              path="signup-seller/form"
                              element={<SignupSeller />}
                            />
                          </Route>
                          <Route
                            path="pending/seller"
                            element={<PendingSeller />}
                          />
                        </Route>

                        {/* Setting Route */}
                        <Route path="/setting" element={<SettingLayout />}>
                          <Route element={<AuthGuard />}>
                            <Route index element={<GeneralSetting />} />
                            <Route
                              path="security"
                              element={<SecuritySetting />}
                            />
                          </Route>
                        </Route>

                        <Route path="/results" element={<SearchResult />} />
                        <Route
                          path="/checkout/cart"
                          element={<CheckoutCart />}
                        />
                        <Route
                          path="/checkout/buynow"
                          element={<CheckoutBuyNow />}
                        />
                        <Route path="/paypal" element={<PayPal />} />
                        <Route path="/help/*" element={<HelpAndFeedback />} />
                        {/* Protected Route */}
                        <Route element={<AuthGuard />}>
                          <Route
                            path="/notification"
                            element={<Notification />}
                          />
                          <Route path="/rukhakbot/*" element={<RukhakBot />} />

                          <Route
                            path="/unauthorize-seller"
                            element={<UnAuthSeller />}
                          />
                        </Route>
                      </Route>

                      {/* Forum Page */}
                      <Route element={<AuthGuard />}>
                        <Route path="/forum/*" element={<ForumPage />} />
                      </Route>

                      {/* Cart Page */}
                      <Route element={<CartLayout />}>
                        <Route element={<AuthGuard />}>
                          <Route index path="/your-cart/*" element={<Cart />} />
                          <Route
                            path="/checkout/cart"
                            element={<CheckoutCart />}
                          />
                          <Route
                            path="/checkout/buynow"
                            element={<CheckoutBuyNow />}
                          />
                          <Route
                            path="/address-list"
                            element={<AddressList />}
                          />
                          <Route path="/paypal" element={<PayPal />} />
                          <Route
                            path="/order-is-confirmed"
                            element={<ConfirmOrder />}
                          />
                        </Route>
                      </Route>

                      <Route element={<AuthGuard allowedRoles={["user"]} />}>
                        <Route
                          path="/map/store-location"
                          element={<Map isStoreAddress={true} />}
                        />
                      </Route>
                      <Route path="/map" element={<MapboxComponent />} />
                      <Route element={<AuthGuard />}>
                        <Route
                          path="/map/create/delivery-location"
                          element={<Map isDeliveryAddress={true} />}
                        />
                        <Route
                          path="/map/delivery-location/:addressId"
                          element={<Map isDeliveryAddress={true} />}
                        />
                      </Route>

                      <Route
                        path="*"
                        element={
                          <NotFound
                            message={"Page"}
                            btnName={"Home"}
                            toPage={"/"}
                          />
                        }
                      />
                    </Routes>
                  </Warpping>
                </CategoriesContextProvider>
              </ReviewContextProvider>
            </SearchProductsContextProvider>
          </UserProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
