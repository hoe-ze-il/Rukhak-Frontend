// MUI component
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useActivateAccountMutation } from "@/features/auth/authApiSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "@/features/auth/authSlice";
import successImage from "@/assets/success.png";
import warningImage from "@/assets/warning.png";

import Loading from "@/components/admin/product/Loading";

const styleTypography = {
  textAlign: "center",
  marginTop: "16px",
  color: "text.primary",
};

function ActivateAccount() {
  const { token } = useParams();
  const realToken = token.replaceAll("RUKHAK2023", ".");

  const [activateError, setActivateError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/";

  const [activateAccount, { isLoading, isSuccess }] =
    useActivateAccountMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await activateAccount({ token: realToken }).unwrap();
        const user = response?.data.user;
        if (response?.status === "success") {
          dispatch(setCredentials({ user }));
          localStorage.setItem("persist", true);
        }
        localStorage.removeItem("email");
      } catch (err) {
        if (err?.status === 401) {
          setActivateError(err?.data?.message);
        } else {
          setActivateError("Internal server error, please try again.");
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnClickSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleOnClickFail = () => {
    navigate("/auth/signup/form");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        component="img"
        src={isSuccess ? successImage : warningImage}
        alt="success-image"
        sx={{ width: "200px" }}
      />
      {isSuccess ? (
        <Typography variant="body1" color="text.primary" sx={styleTypography}>
          Account successfully activated! <br></br>Welcome to Rukhak By clicking
          continue,<br></br> you will be able to continue explore Rukhak.
        </Typography>
      ) : (
        <Typography variant="body1" sx={styleTypography}>
          {activateError.replace("E", "e")}.
        </Typography>
      )}
      <Button
        onClick={isSuccess ? handleOnClickSuccess : handleOnClickFail}
        sx={{
          backgroundColor: "primary.dark",
          color: "white",
          marginTop: "16px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#3D8B3D",
          },
        }}
      >
        {isSuccess ? "Continue" : "Sign up again"}
      </Button>
    </Box>
  );
}

export default ActivateAccount;
