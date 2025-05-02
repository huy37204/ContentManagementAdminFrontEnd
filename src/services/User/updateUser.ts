import { IUser, UpdateUserDto } from "../../interfaces/user";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const updateUser = async (
  id: string,
  user: UpdateUserDto
): Promise<{ data: IUser } | { error: string }> => {
  try {
    const response = await axiosClient.patch(`users/${id}`, user);
    return { data: response.data };
  } catch (err) {
    console.error("Error updating user:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
