import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const deleteUser = async (
  id: string
): Promise<{ success: boolean } | { error: string }> => {
  try {
    await axiosClient.delete(`/users/${id}`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting user:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
