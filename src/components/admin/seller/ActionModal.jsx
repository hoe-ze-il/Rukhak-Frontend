import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUpdateSellerStatusMutation } from "@/features/admin/sellerSlice";
import Loading from "@/components/admin/product/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: 4,
};

export default function ActionModal({
  open,
  setOpen,
  sellerId,
  setSellerId,
  actionType,
  setActionType,
  userName,
  setUserName,
}) {
  const [updateSellerStatus, { isLoading }] = useUpdateSellerStatusMutation();

  async function handleUpdateSellerStatus() {
    try {
      const sellerStatus = getSellerStatus(actionType);
      await updateSellerStatus({ sellerId, sellerStatus: sellerStatus });
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  }

  const handleClose = () => {
    setUserName("");
    setSellerId("");
    setActionType("");
    setOpen(false);
  };

  function getTitle(actionType) {
    switch (actionType) {
      case "approve":
        return "Accept this request?";
      case "disapprove":
        return "Not accept this request?";
      case "activate":
        return "Activate this account?";
      case "deactivate":
        return "Deactivate this account?";
      default:
        return "";
    }
  }

  function getParagraph(actionType) {
    switch (actionType) {
      case "approve":
        return `Are you sure you want to approve the request from ${userName}?`;
      case "disapprove":
        return `Are you sure you want to disapprove the request from ${userName}?`;
      case "activate":
        return `Are you sure you want to activate the account for ${userName}?`;
      case "deactivate":
        return `Are you sure you want to deactivate the account for ${userName}?`;
      default:
        return "";
    }
  }
  function getButtonColor(actionType) {
    switch (actionType) {
      case "approve":
      case "activate":
        return "primary";
      case "disapprove":
      case "deactivate":
        return "error";
      default:
        return "primary";
    }
  }

  function getButtonText(actionType) {
    switch (actionType) {
      case "approve":
        return "Approve";
      case "activate":
        return "Activate";
      case "disapprove":
        return "Disapprove";
      case "deactivate":
        return "Deactivate";
      default:
        return "";
    }
  }

  function getSellerStatus(actionType) {
    switch (actionType) {
      case "approve":
        return "active";
      case "activate":
        return "active";
      case "disapprove":
        return "inactive";
      case "deactivate":
        return "inactive";
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {isLoading && <Loading />}
            <Typography
              sx={{ paddingBottom: "0.5rem" }}
              id="transition-modal-title"
              variant="h5"
              component="h2"
            >
              {getTitle(actionType)}
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2 }}>
              {getParagraph(actionType)}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color={getButtonColor(actionType)}
                onClick={handleUpdateSellerStatus}
              >
                {getButtonText(actionType)}
              </Button>
              <Button sx={{ marginLeft: "0.5rem" }} onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
