import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const logOut = async (): Promise<
  { success: boolean } | { error: string }
> => {
  try {
    await axiosClient.post("/auth/logout");
    return { success: true };
  } catch (err) {
    console.error("Error logging out:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
