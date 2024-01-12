import { adjustImageAspectRatio } from "./imageHandler";
import { htmlToMarkdown } from "./htmlParser";

export const newProductToFormData = async (inputData) => {
  try {
    const thumbnailFile = await convertToFile(inputData.imgCover);
    const media = await convertToFiles(inputData.media);
    const categories = inputData.categories.join(",");
    const convertedDescription = htmlToMarkdown(inputData.description);

    const formData = new FormData();

    const keyValuePairs = {
      title: "title",
      availableStock: "availableStock",
      unit: "unit",
      basePrice: "basePrice",
      dimension: "dimension",
      stockAlert: "stockAlert",
      status: "status",
      sellerId: "sellerId",
      expirationDate: "expirationDate",
    };

    for (const [key, value] of Object.entries(keyValuePairs)) {
      formData.append(key, inputData[value]);
    }
    formData.append("imgCover", thumbnailFile);
    for (const file of media) {
      formData.append("media", file);
    }
    formData.append("description", convertedDescription);
    formData.append("categories", categories);

    // await axios.post("/api/v1/admin/products", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    return formData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function convertToFile(media) {
  const croppedImageUrl = media.croppedImage;

  if (croppedImageUrl) {
    const response = await fetch(croppedImageUrl);
    const blobData = await response.blob();

    return new File([blobData], media.name, {
      type: media.type,
      lastModified: media.lastModified,
    });
  } else {
    const previewUrl = media.preview;
    const response = await fetch(previewUrl);
    const blobData = await response.blob();

    const adjustedBlobData = await adjustImageAspectRatio(blobData);
    return new File([adjustedBlobData], media.name, {
      type: media.type,
      lastModified: media.lastModified,
    });
  }
}

export async function convertToFiles(mediaArray) {
  const fileArray = [];

  for (const photoData of mediaArray) {
    const file = await convertToFile(photoData);
    fileArray.push(file);
  }

  return fileArray;
}
