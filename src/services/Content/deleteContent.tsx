import axiosClient from "../axiosClient";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteContent = async (
  id: string
): Promise<{ success: boolean } | { error: string }> => {
  try {
    await axiosClient.delete(`/contents/${id}`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting content:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
