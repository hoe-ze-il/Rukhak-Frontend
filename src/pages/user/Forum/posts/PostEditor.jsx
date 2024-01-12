import { useState } from "react";
import PostContent from "@/components/user/forum/PostContent";
import AttachmentDrawer from "@/components/user/forum/AttachmentDrawer";
import UserWidget from "@/components/user/forum/UserWidget";
import InputImageCarousel from "@/components/user/forum/InputImageCarousel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Editor = () => {
  const [images, setImages] = useState(null);
  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages);
  };
  const handleRemoveFile = (fileToRemove) => {
    const updatedFiles = images.filter((file) => file !== fileToRemove);
    setImages(updatedFiles);
    handleImagesChange(updatedFiles);
  };

  return (
    <>
      <FormControl>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="flex-start"
          width="100vw"
        >
          <UserWidget />
          <Button type="submit">Save</Button>
        </Box>
        <PostContent />
        {images ? (
          <InputImageCarousel files={images} onRemoveFile={handleRemoveFile} />
        ) : null}
        <AttachmentDrawer onImagesChange={handleImagesChange} />
      </FormControl>
    </>
  );
};

export default Editor;
