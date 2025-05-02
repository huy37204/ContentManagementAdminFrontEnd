import { IUser } from "../../interfaces/user";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const getMe = async (): Promise<{ data: IUser } | { error: string }> => {
  try {
    const response = await axiosClient.get("/auth/me");
    return { data: response.data };
  } catch (err) {
    console.error("Error getting me:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
