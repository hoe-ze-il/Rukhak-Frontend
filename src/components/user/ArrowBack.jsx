import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import settingTheme from "@/theme/settingTheme";
import useUser from "@/hooks/user/useUser";
import PreviewDiscard from "./PreviewDiscard";

function ArrowBack(isSettingPage) {
  const { openPreviewDiscard, setOpenPreviewDiscard } = useUser();
  const navitgate = useNavigate();
  const location = useLocation();
  const { addressId } = useParams();
  let from = location.state?.from?.pathname || "/";
  const handleClick = () => {
    if (
      location?.pathname === `/setting/edit-address/${addressId}` ||
      location?.pathname === "/setting/create-address"
    ) {
      setOpenPreviewDiscard(true);
    } else {
      navitgate(from, { replace: true });
    }
  };
  return (
    <>
      <ArrowBackIcon
        sx={
          isSettingPage
            ? settingTheme.arrowBack
            : { position: "absolute", top: "2%", left: "2%", cursor: "pointer" }
        }
        onClick={handleClick}
      />
      {openPreviewDiscard && <PreviewDiscard />}
    </>
  );
}

export default ArrowBack;
