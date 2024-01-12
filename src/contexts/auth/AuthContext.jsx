import { createContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import {
  useRefreshMutation,
  useLogoutMutation,
} from "@/features/auth/authApiSlice";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const accessToken = useSelector(selectCurrentToken);
  const location = useLocation();
  const persist = localStorage.getItem("persist") === "true" ? true : false;
  const [errorRefresh, setErrorRefresh] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const firstInputRef = useRef(null);

  const [canSignUp, setCanSignUp] = useState(false);
  const [errGoogle, setErrGoogle] = useState("");

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [isFirstName, setIsFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(true);

  const [lastName, setLastName] = useState("");
  const [isLastName, setIsLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(true);

  const [curPassword, setCurPassword] = useState("");
  const [curPasswordFocus, setCurPasswordFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [passwordFocusStart, setPasswordFocusStart] = useState(false);
  const [passwordFocusAfter, setPasswordForcusAfter] = useState(true);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(true);

  const [dateValue, setDateValue] = useState("");
  const [isDateValue, setIsDateValue] = useState(false);
  const [dateValueFocus, setDateValueFocus] = useState(true);

  const [gender, setGender] = useState("");
  const [genderFocus, setGenderFocus] = useState(true);

  const [storeName, setStoreName] = useState("");
  const [storeNameFocus, setStoreNameFocus] = useState(true);

  const [address, setAddress] = useState("");
  const [isAddress, setIsAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(true);

  const [fullname, setFullname] = useState("");
  const [fullnameFocus, setFullnameFocus] = useState(true);

  const [latLon, setLatLon] = useState([11.56, 104.92]);

  const [refreshToken, { isLoading: isRefreshLoading }] = useRefreshMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    // Because React 18 useEffect is run twice in development.
    const verifyRefreshToken = async () => {
      try {
        await refreshToken().unwrap();
      } catch (err) {
        // No refresh token in cookie (expire)
        setErrorRefresh(true);
      }
    };

    const startLogout = async () => {
      // Try catch already handle in authAPIslice
      await logout().unwrap();
    };
    if (!accessToken && persist) {
      verifyRefreshToken();
    } else if (errorRefresh) {
      startLogout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSetStateToDefault();
  }, [location.pathname]);

  const handleRemoreStoreLonLat = (latitude, longitude) => {
    if (latitude && longitude) {
      localStorage.removeItem("storeLatitude");
      localStorage.removeItem("storeLongitude");
    }
    return;
  };

  const findDifferentValues = (curObj, newObj) => {
    let data = {};

    for (let key in curObj) {
      // eslint-disable-next-line no-prototype-builtins
      if (curObj.hasOwnProperty(key) && newObj.hasOwnProperty(key)) {
        if (
          newObj[key] === "" ||
          phoneNumber === curObj[key].slice(5) ||
          (phoneNumber && !isPhoneNumber) ||
          (fullname && fullname.length === 0) ||
          (address && !isAddress) ||
          (newObj[key][0]?.coordinates &&
            newObj[key][0]?.coordinates[0] === null)
        ) {
          data = { ...data };
        } else if (curObj[key] !== newObj[key]) {
          data = { ...data, [key]: newObj[key] };
        }
      }
    }

    return data;
  };

  const handleSetStateToDefault = () => {
    const defaultState = {
      isPassword: false,
      canSignUp: false,
      errGoogle: "",
      email: "",
      isEmail: false,
      emailFocus: true,
      firstName: "",
      isFirstName: false,
      firstNameFocus: true,
      lastName: "",
      isLastName: false,
      lastNameFocus: true,
      curPassword: "",
      curPasswordFocus: false,
      password: "",
      passwordFocusStart: false,
      passwordFocusAfter: true,
      passwordConfirm: "",
      passwordConfirmFocus: false,
      isMatch: false,
      errorRefresh: false,
      phoneNumber: "",
      isPhoneNumber: false,
      phoneNumberFocus: true,
      dateValue: "",
      isDateValue: false,
      dateValueFocus: true,
      gender: "",
      genderFocus: true,
      storeName: "",
      storeNameFocus: true,
      address: "",
      isAddress: false,
      addressFocus: true,
      latLon: [11.56, 104.92],
      otp: new Array(6).fill(""),
      firstInputRef: null,
      fullname: "",
      fullnameFocus: true,
    };

    setCanSignUp(defaultState.canSignUp);
    setErrGoogle(defaultState.errGoogle);
    setEmail(defaultState.email);
    setIsEmail(defaultState.isEmail);
    setEmailFocus(defaultState.emailFocus);
    setFirstName(defaultState.firstName);
    setIsFirstName(defaultState.isFirstName);
    setFirstNameFocus(defaultState.firstNameFocus);
    setLastName(defaultState.lastName);
    setIsLastName(defaultState.isLastName);
    setLastNameFocus(defaultState.lastNameFocus);
    setCurPassword(defaultState.curPassword);
    setCurPasswordFocus(defaultState.curPasswordFocus);
    setPassword(defaultState.password);
    setPasswordForcusAfter(defaultState.passwordFocusAfter);
    setPasswordFocusStart(defaultState.passwordFocusStart);
    setPasswordConfirm(defaultState.passwordConfirm);
    setPasswordConfirmFocus(defaultState.passwordConfirmFocus);
    setIsMatch(defaultState.isMatch);
    setErrorRefresh(defaultState.errorRefresh);
    setPhoneNumber(defaultState.phoneNumber);
    setIsPhoneNumber(defaultState.isPhoneNumber);
    setPhoneNumberFocus(defaultState.phoneNumberFocus);
    setDateValue(defaultState.dateValue);
    setIsDateValue(defaultState.isDateValue);
    setDateValueFocus(defaultState.dateValueFocus);
    setGender(defaultState.gender);
    setGenderFocus(defaultState.genderFocus);
    setStoreName(defaultState.storeName);
    setStoreNameFocus(defaultState.storeNameFocus);
    setAddress(defaultState.address);
    setIsAddress(defaultState.isAddress);
    setAddressFocus(defaultState.addressFocus);
    setLatLon(defaultState.latLon);
    setOtp(defaultState.otp);
    setFullname(defaultState.fullname);
    setFullnameFocus(defaultState.fullnameFocus);
  };

  return (
    <AuthContext.Provider
      value={{
        isRefreshLoading,
        isLogoutLoading,
        isPassword,
        setIsPassword,
        canSignUp,
        setCanSignUp,
        errGoogle,
        setErrGoogle,
        email,
        setEmail,
        isEmail,
        setIsEmail,
        emailFocus,
        setEmailFocus,
        firstName,
        setFirstName,
        isFirstName,
        setIsFirstName,
        firstNameFocus,
        setFirstNameFocus,
        lastName,
        setLastName,
        isLastName,
        setIsLastName,
        lastNameFocus,
        setLastNameFocus,
        curPassword,
        setCurPassword,
        curPasswordFocus,
        setCurPasswordFocus,
        password,
        setPassword,
        passwordFocusAfter,
        setPasswordForcusAfter,
        passwordFocusStart,
        setPasswordFocusStart,
        passwordConfirm,
        setPasswordConfirm,
        passwordConfirmFocus,
        setPasswordConfirmFocus,
        isMatch,
        setIsMatch,
        errorRefresh,
        setErrorRefresh,
        phoneNumber,
        setPhoneNumber,
        isPhoneNumber,
        setIsPhoneNumber,
        phoneNumberFocus,
        setPhoneNumberFocus,
        dateValue,
        setDateValue,
        dateValueFocus,
        setDateValueFocus,
        isDateValue,
        setIsDateValue,
        gender,
        setGender,
        genderFocus,
        setGenderFocus,
        storeName,
        setStoreName,
        storeNameFocus,
        setStoreNameFocus,
        address,
        setAddress,
        isAddress,
        setIsAddress,
        addressFocus,
        setAddressFocus,
        latLon,
        setLatLon,
        handleRemoreStoreLonLat,
        otp,
        setOtp,
        firstInputRef,
        fullname,
        setFullname,
        fullnameFocus,
        setFullnameFocus,
        findDifferentValues,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
