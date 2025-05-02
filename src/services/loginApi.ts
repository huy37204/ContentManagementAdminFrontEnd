import { ILoginResponse } from "../interfaces/auth";
import { handleApiError } from "../ultils/handleApiError";
import axiosClient from "./axiosClient";

export const loginApi = async (
  email: string,
  password: string
): Promise<{ data: ILoginResponse } | { error: string }> => {
  try {
    const res = await axiosClient.post<ILoginResponse>("/auth/login", {
      email,
      password,
    });
    return { data: res.data };
  } catch (error) {
    console.error("Login error: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
