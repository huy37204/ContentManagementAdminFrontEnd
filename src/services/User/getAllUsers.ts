import { IUser } from "../../interfaces/user";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const getAllUsers = async (): Promise<
  { data: IUser[] } | { error: string }
> => {
  try {
    const response = await axiosClient.get("/users");
    return { data: response.data };
  } catch (err) {
    console.error("Error getting all users:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
