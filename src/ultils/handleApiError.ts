export const handleApiError = (error: any): string => {
  if (
    error?.response?.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error?.response?.data && typeof error.response.data.detail === "string") {
    return error.response.data.detail;
  }

  if (error?.response?.data && typeof error.response.data.title === "string") {
    return error.response.data.title;
  }

  return "An unknown error occured";
};
