import { IContent } from "../../interfaces/content";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const findAllContent = async (): Promise<
  { data: IContent[] } | { error: string }
> => {
  try {
    const response = await axiosClient.get("/contents");
    return { data: response.data };
  } catch (error) {
    console.error("Error finding all contents:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
