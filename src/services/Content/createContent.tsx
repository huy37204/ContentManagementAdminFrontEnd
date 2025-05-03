import { AddContentDto, IContent } from "../../interfaces/content";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const createContent = async (
  data: AddContentDto
): Promise<{ data: IContent } | { error: string }> => {
  try {
    const response = await axiosClient.post("contents", data);
    return { data: response.data };
  } catch (err) {
    console.error("Error creating content:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
