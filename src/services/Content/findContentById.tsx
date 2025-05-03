import { IContent } from "../../interfaces/content";
import { handleApiError } from "../../ultils/handleApiError";
import axiosClient from "../axiosClient";

export const findContentById = async (
  id: string
): Promise<{ data: IContent } | { error: string }> => {
  try {
    const res = await axiosClient.get(`/contents/${id}`);
    return { data: res.data };
  } catch (error) {
    return { error: handleApiError(error) };
  }
};
