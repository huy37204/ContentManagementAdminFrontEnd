import { IContent, UpdateContentDto } from "../../interfaces/content";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const updateContent = async (
  id: string,
  content: UpdateContentDto
): Promise<{ data: IContent } | { error: string }> => {
  try {
    const response = await axiosClient.patch(`/contents/${id}`, content);
    return { data: response.data };
  } catch (err) {
    console.error("Error updating content:", err);
    const errMsg = handleApiError(err);
    return { error: errMsg };
  }
};
