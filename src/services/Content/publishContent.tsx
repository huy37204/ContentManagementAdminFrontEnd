import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const publishContent = async (
  id: string
): Promise<{ success: boolean } | { error: string }> => {
  try {
    await axiosClient.patch(`contents/${id}/publish`);
    return { success: true };
  } catch (err) {
    console.error("Error publishing content:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
