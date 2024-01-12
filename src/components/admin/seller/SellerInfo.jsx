import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import _capitalize from "lodash/capitalize";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ActionModal from "@/components/admin/seller/ActionModal";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function SellerInfo(props) {
  const { row } = props;
  const [actionType, setActionType] = useState("");
  const [userName, setUserName] = useState("");
  const [drop, setDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const handleOpen = (actionType, id, userName) => {
    setSellerId(id);
    setUserName(userName);
    setActionType(actionType);
    setOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning.main";
      case "active":
        return "success.main";
      case "inactive":
        return "error.main";
      default:
        return "";
    }
  };

  return (
    <>
      <ActionModal
        open={open}
        setOpen={setOpen}
        sellerId={sellerId}
        setSellerId={setSellerId}
        actionType={actionType}
        setActionType={setActionType}
        userName={userName}
        setUserName={setUserName}
      />
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setDrop(!drop)}
          >
            {drop ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`${row.firstName} ${row.lastName}`}
        </TableCell>
        <TableCell align="right">{row.storeName}</TableCell>
        <TableCell
          align="right"
          sx={{ color: getStatusColor(row.sellerStatus) }}
        >
          {_capitalize(row.sellerStatus)}
        </TableCell>
        <TableCell align="center">
          {row.sellerStatus === "pending" ? (
            <>
              <IconButton
                onClick={() => handleOpen("approve", row._id, row.firstName)}
              >
                <DoneIcon color="success" />
              </IconButton>
              <IconButton
                onClick={() => handleOpen("disapprove", row._id, row.firstName)}
              >
                <CloseIcon color="error" />
              </IconButton>
            </>
          ) : row.sellerStatus === "active" ? (
            <>
              <IconButton
                onClick={() => handleOpen("deactivate", row._id, row.firstName)}
              >
                <PersonRemoveIcon color="error" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={() => handleOpen("activate", row._id, row.firstName)}
              >
                <HowToRegIcon color="success" />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: "0 1rem" }} />
        <TableCell style={{ padding: "0 1rem" }} colSpan={5}>
          <Collapse in={drop} timeout="auto" unmountOnExit>
            <Box>
              <div className="seller-extra-info">
                <p>
                  <LocalPhoneOutlinedIcon size="small" />
                  {row.phoneNumber}
                </p>
                <p>
                  <EmailOutlinedIcon />
                  {row.email}
                </p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default SellerInfo;
