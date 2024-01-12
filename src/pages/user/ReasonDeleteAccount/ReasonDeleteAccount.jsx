import AuthHeader from "@/components/auth/AuthHeader";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import settingTheme from "@/theme/settingTheme";

const reasons = [
  {
    reason: "I am concerned about the privacy of my personal information.",
  },
  {
    reason: "I am worried about the security of my account.",
  },
  {
    reason:
      "I am dissatisfied with the services or features provided by the application.",
  },
  {
    reason:
      "I have personal reasons for wanting to discontinue my use of the platform.",
  },
  {
    reason:
      "I want to stop receiving communications or notifications from the platform.",
  },
];

function ReasonDeleteAccount() {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReasonDeleteAccount, setOtherReasonDeleteAccount] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const canClick =
    ((selectedReasons.length > 0 && !selectedReasons.includes("Other")) ||
      otherReasonDeleteAccount) &&
    true;

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prevSelectedReasons) => {
      if (prevSelectedReasons.includes(reason)) {
        return prevSelectedReasons.filter(
          (selectedReason) => selectedReason !== reason
        );
      } else {
        return [...prevSelectedReasons, reason];
      }
    });
  };

  const handleClickNext = () => {
    if (canClick) {
      let allReasons = [...selectedReasons, otherReasonDeleteAccount];
      const reasonToDelete = allReasons.includes("Other")
        ? allReasons.filter((el) => el !== "Other")
        : allReasons;
      localStorage.setItem(
        "reasonDeleteAccount",
        JSON.stringify(reasonToDelete)
      );
      navigate("/setting/delete-account", {
        state: { from: location },
        replace: true,
      });
    }
  };

  return (
    <Box sx={settingTheme.settingHeader}>
      <AuthHeader
        logo={false}
        title="Reason Delete Account"
        description="Please provide a proper reason for delete account."
      />
      <FormControl>
        <FormGroup>
          {reasons.map((reason, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={selectedReasons.includes(reason.reason)}
                  onChange={() => handleCheckboxChange(reason.reason)}
                />
              }
              label={reason.reason}
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedReasons.includes("Other")}
                onChange={() => handleCheckboxChange("Other")}
              />
            }
            label="Other"
          />
        </FormGroup>
      </FormControl>
      {selectedReasons.includes("Other") && (
        <TextField
          id="outlined-multiline-static"
          label="Reason"
          multiline
          rows={4}
          value={otherReasonDeleteAccount}
          onChange={(e) => setOtherReasonDeleteAccount(e.target.value)}
        />
      )}
      <ButtonGeneral
        text="Next"
        onClick={handleClickNext}
        canClick={canClick}
      />
    </Box>
  );
}

export default ReasonDeleteAccount;
