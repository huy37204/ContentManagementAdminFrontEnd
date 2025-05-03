import axiosClient from "../axiosClient";
import { handleApiError } from "../../ultils/handleApiError";

export const uploadToS3 = async (
  file: File
): Promise<{ url: string } | { error: string }> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { url: response.data.url };
  } catch (err) {
    console.error("Error uploading file:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
