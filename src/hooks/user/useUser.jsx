import UserContext from "@/contexts/user/UserContext";
import { useContext } from "react";

function useUser() {
  const { ...values } = useContext(UserContext);
  return values;
}

export default useUser;
