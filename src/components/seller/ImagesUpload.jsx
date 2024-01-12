import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropModal from "./ImageCropModal";
import { getCroppedImg, getImageDimensions } from "@/utils/admin/imageHandler";
import { ImagePlus } from "lucide-react";
import { useContext } from "react";
import { ProductFormContext } from "@/contexts/seller/ProductFormContext";
import Avatar from "@mui/material/Avatar";
import CropIcon from "@mui/icons-material/Crop";
import CloseIcon from "@mui/icons-material/Close";
import DeleteImageModal from "./DeleteImageModal";

function ImagesUpload({
  attemptedSubmit,
  validPhoto,
  setValidPhoto,
  mode,
  signedMedia,
  setSignedMedia,
}) {
  const { files, setFiles } = useContext(ProductFormContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ current: null });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [originImageDimensions, setOriginImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: 3,
    // maxSize: 1024 * 1000,
  });

  function removeFile(name) {
    const filePathRegex = /products-update\/media\/[^?]+/;
    const originalPath = name.match(filePathRegex);

    if (mode === "edit" && files.length !== 0) {
      if (!isNewPhotoAdded(files)) {
        setFiles((prevArray) =>
          prevArray.filter((item) => originalPath && item !== originalPath[0])
        );

        // prevArray.filter((item) => originalPath && item !== originalPath[0])
      } else {
        setFiles((prevFiles) => {
          return prevFiles
            .map((file) => {
              if (typeof file === "object" && file.name === name) {
                return null;
              } else if (typeof file === "string") {
                if (originalPath && file === originalPath[0]) {
                  return null;
                } else {
                  return file;
                }
              } else {
                return file;
              }
            })
            .filter((filteredFile) => filteredFile !== null);
        });
      }
      setSignedMedia((prevArray) => prevArray.filter((item) => item !== name));
    } else {
      setFiles((files) => files.filter((file) => file.name !== name));
    }
  }

  function onEditClick(img) {
    setSelectedImage({ current: img });
    const dimensions = getImageDimensions(img);
    setOriginImageDimensions({
      width: dimensions.width,
      height: dimensions.height,
    });
    setIsEditing(true);
  }

  function updateFile(origin, newImg) {
    // Spread operator does not work
    setFiles((prevArray) => {
      return prevArray.map((file) => {
        if (file.preview === origin || file.croppedImage === origin) {
          return {
            path: file.path,
            preview: file.preview,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath,
            croppedImage: newImg,
          };
        } else {
          return file;
        }
      });
    });

    /*
    setFiles((prevArray) => {
      return prevArray.map((file) =>
        file.preview === origin ? { ...file, preview: newImg } : file
      );
    });
    */
  }

  function revertCropMedia(img) {
    const fileToRevert = files.find((file) => file.croppedImage === img);

    if (fileToRevert) {
      // Revert the file in the state
      setFiles((prevArray) => {
        return prevArray.map((file) => {
          if (file.croppedImage === img) {
            return { ...file, croppedImage: null };
          } else {
            return file;
          }
        });
      });

      setIsEditing(false);
      URL.revokeObjectURL(img);
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
    if (attemptedSubmit) {
      setValidPhoto(!(files.length === 0));
    }
  }, [files]);

  useEffect(() => {
    return () => {
      // Revoke the image URL to prevent memory leaks
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
        if (file.croppedImage) URL.revokeObjectURL(file.croppedImage);
      });
    };
  }, []);

  const previews = files?.map(
    (file) =>
      typeof file === "object" && (
        <div key={file.name}>
          <div className="preview">
            <div className="preview-inner">
              <img
                src={file.croppedImage ? file.croppedImage : file.preview}
                className="image"
                alt=""
              />
            </div>

            <div className="preview-buttons">
              <Avatar
                sx={{ bgcolor: "#90a4ae" }}
                onClick={() => {
                  onEditClick(
                    file.croppedImage ? file.croppedImage : file.preview
                  );
                }}
              >
                <CropIcon />
              </Avatar>
              <Avatar
                sx={{ bgcolor: "#f4511e" }}
                onClick={() => {
                  removeFile(file.name);
                }}
              >
                <CloseIcon />
              </Avatar>
            </div>
          </div>
        </div>
      )
  );

  function isNewPhotoAdded(arr) {
    return arr.some((item) => typeof item === "object");
  }

  const signedMediaPreview = (
    <>
      {signedMedia?.map((url) => (
        <div key={url}>
          <div className="preview">
            <div className="preview-inner">
              <img src={url} className="image" alt="" />
            </div>

            <div className="preview-buttons">
              <DeleteImageModal deleteImage={removeFile} url={url} />
            </div>
          </div>
        </div>
      ))}
      {isNewPhotoAdded(files) && previews}
    </>
  );
  const dropZone = (
    <div className="preview">
      <div
        className={validPhoto ? "drop-zone" : "drop-zone invalid-img"}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <p>Drop the files here ...</p>
          </>
        ) : (
          <>
            <div className="dropzone-content">
              <ImagePlus size={36} />
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {files.length > 0 ? (
        <>
          {mode === "edit" ? signedMediaPreview : previews}
          {files.length < 3 && dropZone}
        </>
      ) : (
        dropZone
      )}
      {isEditing && (
        <div className="">
          <ImageCropModal
            isEditing={isEditing}
            selectedImage={selectedImage.current}
            setSelectedImage={setSelectedImage}
            setIsEditing={setIsEditing}
            makeClientCrop={makeClientCrop}
            originImageDimensions={originImageDimensions}
            revertCropMedia={revertCropMedia}
          />
        </div>
      )}
    </>
  );
}

export default ImagesUpload;
