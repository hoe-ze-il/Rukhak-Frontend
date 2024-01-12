import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserRole,
} from "@/features/auth/authSlice";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function PreventAuthPage() {
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const userRole = useSelector(selectCurrentUserRole);
  const token = useSelector(selectCurrentToken);
  const persist = localStorage.getItem("persist") === "true" ? true : false;

  if ((persist || token) && userRole === "admin") {
    return <Navigate to="/admin" />;
  } else if ((persist || token) && userRole !== "admin") {
    return <Navigate to={from} />;
  } else {
    return <Outlet />;
  }
}

export default PreventAuthPage;
