// MUI component
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// Internal component
import ButtonGeneral from "../user/ButtonGeneral";

import { useUploadProfileImageMutation } from "@/features/user/userApiSlice";
import { useContext } from "react";
import UserContext from "@/contexts/user/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "400px",
  backgroundColor: "white",
  p: 4,
};

export default function ImagePreviewModal({
  imagePreview,
  setImagepreview,
  file,
  setFile,
}) {
  const { setOpenPreviewImage, openPreviewImage } = useContext(UserContext);

  const handleClose = () => {
    setOpenPreviewImage(false);
    setImagepreview("");
    setFile("");
  };

  const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    console.log(file)
    try {
      await uploadProfileImage(formData).unwrap();
      setOpenPreviewImage(false);
      setImagepreview("");
      setFile("");
    } catch (err) {
      console.log(err);
      setOpenPreviewImage(false);
      setImagepreview("");
      setFile("");
    }
  };

  return (
    <div>
      <Modal
        open={openPreviewImage}
        onClose={handleClose}
        aria-labelledby="image-preview"
        aria-describedby="user-image"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                minWidth: "200px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "5px solid whitesmoke",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={imagePreview}
                alt="user-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <ButtonGeneral
                text="Save"
                onClick={handleUploadImage}
                isLoading={isLoading}
              />
              <ButtonGeneral
                text="Cancel"
                onClick={handleClose}
                canClick={!isLoading}
                buttonBGColor="gray"
                buttonHover="#666666"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
