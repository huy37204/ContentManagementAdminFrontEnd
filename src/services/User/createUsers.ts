import { AddUserDto, IUser } from "../../interfaces/user";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const createUser = async (
  user: AddUserDto
): Promise<{ data: IUser } | { error: string }> => {
  try {
    const response = await axiosClient.post("/users", user);
    return { data: response.data };
  } catch (err) {
    console.error("Error creating user:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
