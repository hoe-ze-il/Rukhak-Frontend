import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentUserRole,
  selectCurrentToken,
} from "@/features/auth/authSlice";
import { useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import settingTheme from "@/theme/settingTheme";
import useAuth from "@/hooks/auth/useAuth";
import useUser from "@/hooks/user/useUser";
import { useLogoutMutation } from "@/features/auth/authApiSlice";

function AuthGuard({ allowedRoles = ["user", "seller", "admin"] }) {
  const { user } = useUser();
  const { isRefreshLoading, isLogoutLoading } = useAuth();
  const [logout] = useLogoutMutation();
  const accessToken = useSelector(selectCurrentToken);
  const userRole = useSelector(selectCurrentUserRole);
  const sellerStatus = user?.sellerStatus;
  const persist = localStorage.getItem("persist") === "true" ? true : false; // Prevent error JSON.pare if user change the value in local storage
  const canAccess = accessToken && persist && true;
  const location = useLocation();

  useEffect(() => {
    const startLogout = async () => {
      await logout().unwrap();
    };
    if (!persist) {
      startLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist]);

  if (isRefreshLoading || isLogoutLoading) {
    return <CircularProgress color="success" sx={settingTheme.loading} />;
  } else if (!persist) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  } else if (canAccess && allowedRoles[0] === "seller") {
    if (userRole === "user") {
      return (
        <Navigate to="/unauthorize-seller" state={{ from: location }} replace />
      );
    } else if (userRole === "seller" && sellerStatus === "pending") {
      return <Navigate to="/auth/pending/seller" />;
    } else {
      return <Outlet />;
    }
  } else if (canAccess && allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else if (canAccess && allowedRoles[0] === "admin" && userRole !== "admin") {
    return <Navigate to="/auth/unauthorize" />;
  }
}
export default AuthGuard;
