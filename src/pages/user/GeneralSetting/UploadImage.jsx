// MUI component
import Box from "@mui/material/Box";

// Internal Component
import ImagePreviewModal from "@/components/setting/ImagePreviewModal";
import ButtonGeneral from "@/components/user/ButtonGeneral";

// Theme
import settingTheme from "@/theme/settingTheme";

import { useState, useContext } from "react";
import UserContext from "@/contexts/user/UserContext";
import defaultImage from "@/assets/Default_image.jpg";
import useUser from "@/hooks/user/useUser";

function UploadImage() {
  const { user } = useUser();
  console.log(user?.imageURL)
  const { setOpenPreviewImage } = useContext(UserContext);
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
    setOpenPreviewImage(true);
  };
  if (imagePreview) {
    return (
      <ImagePreviewModal
        imagePreview={imagePreview}
        setImagepreview={setImagePreview}
        file={file}
        setFile={setFile}
      />
    );
  }

  return (
    <Box sx={settingTheme.boxContainer}>
      <Box sx={settingTheme.imageContainer}>
        <Box
          component="img"
          src={user?.imageURL || defaultImage}
          alt="User image"
          sx={settingTheme.imageProfile}
        />
      </Box>
      <ButtonGeneral
        text="Upload image"
        type="file"
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default UploadImage;
