export async function getCroppedImg(
  file,
  crop,
  fileName,
  fullImgWidth,
  fullImgHeight
) {
  try {
    const image = new Image();
    image.src = file;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error("Image loading error"));
    });

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / fullImgWidth;
    const scaleY = image.naturalHeight / fullImgHeight;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/jpeg");
    });

    blob.name = fileName;
    const croppedImageUrl = window.URL.createObjectURL(blob);
    return croppedImageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getImageDimensions(src) {
  const img = new Image();
  img.src = src;
  if (img.complete) {
    return { width: img.width, height: img.height };
  } else {
    throw new Error("Image error");
  }
}

export async function adjustImageAspectRatio(blobData) {
  const img = new Image();
  const url = URL.createObjectURL(blobData);

  return new Promise((resolve) => {
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const originalWidth = img.width;
      const originalHeight = img.height;
      const desiredAspectRatio = 4 / 3;

      let newWidth, newHeight;
      let xOffset = 0;
      let yOffset = 0;

      // Check the aspect ratio and calculate new dimensions and offsets
      if (originalWidth / originalHeight !== desiredAspectRatio) {
        if (originalWidth / originalHeight > desiredAspectRatio) {
          newWidth = originalHeight * desiredAspectRatio;
          newHeight = originalHeight;
          xOffset = (originalWidth - newWidth) / 2;
        } else {
          newWidth = originalWidth;
          newHeight = originalWidth / desiredAspectRatio;
          yOffset = (originalHeight - newHeight) / 2;
        }
      } else {
        newWidth = originalWidth;
        newHeight = originalHeight;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(
        img,
        xOffset,
        yOffset,
        newWidth,
        newHeight,
        0,
        0,
        newWidth,
        newHeight
      );

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(blob);
      }, "image/jpeg");
    };

    img.src = url;
  });
}
