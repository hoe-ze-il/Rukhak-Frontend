import { useContext } from "react";
import AuthContext from "@/contexts/auth/AuthContext";

function useAuth() {
  const { ...values } = useContext(AuthContext);
  return values;
}

export default useAuth;
