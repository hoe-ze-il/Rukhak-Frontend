import { createContext, useState } from "react";
import { useGetUserQuery } from "@/features/user/userApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const [openPreviewDiscard, setOpenPreviewDiscard] = useState(false);
  const [isUpdateInfoSuccess, setIsUpdateInfoSuccess] = useState(false);
  const userId = useSelector(selectCurrentUserId);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(userId, {
    skip: userId ? false : true, // true means don't fetch user
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const curAddress = user?.addresses.find(
    (address) => address?.currentlyUse === true
  );
  const handleGetCurDeliAddress = (addressId) => {
    const curDeliAddress = user?.addresses.find(
      (address) => address._id === addressId
    );
    return curDeliAddress;
  };

  const handleUpdateStatus = () => {
    setIsUpdateInfoSuccess(true);
    setTimeout(() => {
      setIsUpdateInfoSuccess(false);
    }, 10000);
  };

  return (
    <UserContext.Provider
      value={{
        openPreviewImage,
        setOpenPreviewImage,
        openPreviewDiscard,
        setOpenPreviewDiscard,
        isUpdateInfoSuccess,
        handleGetCurDeliAddress,
        handleUpdateStatus,
        user,
        isLoading,
        isError,
        curAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
