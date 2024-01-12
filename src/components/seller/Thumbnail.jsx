import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropModal from "./ImageCropModal";
import { ImagePlus } from "lucide-react";
import { getCroppedImg, getImageDimensions } from "@/utils/admin/imageHandler";
import { useContext } from "react";
import { ProductFormContext } from "@/contexts/seller/ProductFormContext";
import CropIcon from "@mui/icons-material/Crop";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import DeleteImageModal from "./DeleteImageModal";

function Thumbnail({
  attemptedSubmit,
  validThumbnail,
  setValidThumbnail,
  mode,
  signedImgCover,
  setSignedImgCover,
}) {
  const { file, setFile } = useContext(ProductFormContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ current: null });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [originImageDimensions, setOriginImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile(
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: 1,
  });

  function onEditClick(img) {
    setSelectedImage({ current: img });
    const dimensions = getImageDimensions(img);
    setOriginImageDimensions({
      width: dimensions.width,
      height: dimensions.height,
    });
    setIsEditing(true);
  }

  function removeFile() {
    if (mode === "edit") {
      setSignedImgCover("");
      setFile("");
    }

    URL.revokeObjectURL(file.preview);
    setFile("");
  }

  function updateFile(origin, newImg) {
    setFile((prevState) => ({
      path: prevState.path,
      preview: prevState.preview,
      lastModified: prevState.lastModified,
      lastModifiedDate: prevState.lastModifiedDate,
      name: prevState.name,
      size: prevState.size,
      type: prevState.type,
      webkitRelativePath: prevState.webkitRelativePath,
      croppedImage: newImg,
    }));
    // URL.revokeObjectURL(origin);
  }

  function revertCrop() {
    if (file.croppedImage) {
      URL.revokeObjectURL(file.croppedImage);
      setFile((prevState) => ({ ...prevState, croppedImage: null }));
      onEditClick(file.preview);
    }
  }

  async function makeClientCrop(crop, fullImgWidth, fullImgHeight) {
    if (selectedImage.current && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(
        selectedImage.current,
        crop,
        "newFile.jpeg",
        fullImgWidth,
        fullImgHeight
      );
      setCroppedImageUrl(croppedImage);
      updateFile(selectedImage.current, croppedImage);
    }
  }

  useEffect(() => {
    return () => {
      // Revoke the image URL to prevent memory leaks
      if (file) {
        URL.revokeObjectURL(file.preview);
        if (file.croppedImage) URL.revokeObjectURL(file.croppedImage);
      }
    };
  }, []);

  useEffect(() => {
    if (attemptedSubmit) {
      setValidThumbnail(!!file);
    }
  }, [file]);

  const preview = (
    <>
      <div className="preview-inner">
        <img
          src={file.croppedImage ? file.croppedImage : file.preview}
          alt=""
          className="image"
        />
      </div>
      <div className="preview-buttons">
        <Avatar
          sx={{ bgcolor: "#90a4ae" }}
          onClick={() => {
            onEditClick(file.croppedImage ? file.croppedImage : file.preview);
          }}
        >
          <CropIcon />
        </Avatar>

        <Avatar
          sx={{ bgcolor: "#f4511e" }}
          variant="contained"
          onClick={removeFile}
        >
          <CloseIcon />
        </Avatar>
      </div>
    </>
  );

  const signedImgCoverPreview = (
    <>
      <div className="preview-inner">
        <img src={signedImgCover} alt="" className="image" />
      </div>
      <div className="preview-buttons">
        <DeleteImageModal deleteImage={removeFile} />
      </div>
    </>
  );

  console.log(signedImgCover);

  return (
    <>
      {file ? (
        mode === "edit" && signedImgCover ? (
          signedImgCoverPreview
        ) : (
          preview
        )
      ) : (
        <div
          className={validThumbnail ? "drop-zone" : "drop-zone invalid-img"}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="dropzone-content">
              <p>Add a Thumbnail</p>
              <ImagePlus size={64} />
            </div>
          )}
        </div>
      )}
      {isEditing && (
        <div className="">
          <ImageCropModal
            selectedImage={selectedImage.current}
            setSelectedImage={setSelectedImage}
            setIsEditing={setIsEditing}
            makeClientCrop={makeClientCrop}
            originImageDimensions={originImageDimensions}
            revertCrop={revertCrop}
          />
        </div>
      )}
    </>
  );
}

export default Thumbnail;
