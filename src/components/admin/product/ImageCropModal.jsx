import ReactCrop from "react-image-crop";
import { useState, useRef, useEffect } from "react";
import "@/styles/admin/imageCropModal.scss";
import { makeAspectCrop, centerCrop } from "react-image-crop";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";

function ImageCropModal({
  selectedImage,
  setSelectedImage,
  setIsEditing,
  makeClientCrop,
  originImageDimensions,
  revertCrop,
  revertCropMedia,
}) {
  const [crop, setCrop] = useState();
  const imgContainerRef = useRef(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  function onCropComplete(crop, fullImgWidth, fullImgHeight) {
    setSelectedImage({ current: null });
    setIsEditing(false);
    makeClientCrop(crop, fullImgWidth, fullImgHeight);
    setCrop();
  }

  function cancelEdit() {
    setSelectedImage({ current: null });
    setIsEditing(false);
    setCrop();
  }

  function onImageLoad() {
    const width = imgDimensions.width;
    const height = imgDimensions.height;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: width * 0.8,
        },
        4 / 3,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }

  useEffect(() => {
    // update the dimensions of the img container
    const updateImgDimensions = () => {
      if (imgContainerRef.current) {
        const width = imgContainerRef.current.clientWidth;
        const height = imgContainerRef.current.clientHeight;
        setImgDimensions({ width, height });
      }
    };

    updateImgDimensions();

    window.addEventListener("resize", updateImgDimensions);

    // clean up
    return () => {
      window.removeEventListener("resize", updateImgDimensions);
    };
  }, [selectedImage]);

  function handleOutSideClick(event) {
    if (
      imgContainerRef.current &&
      !imgContainerRef.current.contains(event.target) &&
      !event.target.closest(".crop-buttons")
    ) {
      cancelEdit();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutSideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [imgContainerRef]);

  return ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-body">
          <div className="crop-preview">
            <ReactCrop crop={crop} aspect={4 / 3} onChange={(c) => setCrop(c)}>
              <div
                className={
                  originImageDimensions.width > originImageDimensions.height
                    ? "image-container-landscape"
                    : "image-container"
                }
              >
                <div className="preview-inner">
                  <img
                    ref={imgContainerRef}
                    className="image"
                    src={selectedImage}
                    alt="Selected"
                    onLoad={onImageLoad}
                  />
                </div>
              </div>
            </ReactCrop>

            <div className="crop-buttons">
              <Button variant="outlined" onClick={cancelEdit}>
                Cancel
              </Button>
              {revertCrop && (
                <Button variant="outlined" onClick={revertCrop}>
                  Revert
                </Button>
              )}
              {revertCropMedia && (
                <Button
                  variant="outlined"
                  onClick={() => revertCropMedia(selectedImage)}
                >
                  Revert
                </Button>
              )}

              <Button
                variant="contained"
                onClick={() =>
                  onCropComplete(
                    crop,
                    imgDimensions.width,
                    imgDimensions.height
                  )
                }
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default ImageCropModal;
