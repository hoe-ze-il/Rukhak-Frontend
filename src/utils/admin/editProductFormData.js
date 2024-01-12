import { convertToFile, convertToFiles } from "./createProductFormData";

export const editProductToFormData = async (previousData, updatedData) => {
  const formData = new FormData();
  const editableFields = [
    "imgCover",
    "media",
    "title",
    "description",
    "categories",
    "availableStock",
    "unit",
    "basePrice",
    "dimension",
    "stockAlert",
    "status",
    "expirationDate",
  ];

  const changes = {};

  editableFields.forEach(async (field) => {
    if (
      JSON.stringify(previousData[field]) !== JSON.stringify(updatedData[field])
    ) {
      if (field !== "media") {
        if (field !== "categories") {
          formData.append(field, updatedData[field]);
        } else {
          formData.append(field, updatedData[field].join(","));
        }
      }
      changes[field] = updatedData[field];
    }
  });

  if (changes.imgCover) {
    changes.imgCover = await convertToFile(changes.imgCover);
    formData.set("imgCover", changes.imgCover);
  }

  if (changes.media && Array.isArray(changes.media)) {
    let newMedia = [];
    const existingMedia = [];

    // Separate new media files from existing media URLs
    changes.media.forEach((item) => {
      if (typeof item === "object") {
        newMedia.push(item);
      } else if (typeof item === "string") {
        existingMedia.push(item);
      }
    });

    if (newMedia) {
      newMedia = await convertToFiles(newMedia);
      newMedia.map((item) => formData.append("newMedia", item));
    }

    if (existingMedia.length > 0) {
      existingMedia.map((item) => formData.append("media", item));
    } else {
      formData.append("media", []);
    }
  }

  if (Object.keys(changes).length > 0) {
    formData.append("sellerId", previousData.sellerId?._id);
    return formData;
  }
  return false;
};
