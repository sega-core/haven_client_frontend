interface ErrorResponse {
  response?: {
    data?: {
      data?: {
        error?: {
          message?: string;
          type?: string;
          name?: string;
        };
        message?: string;
      };
      message?: string;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any): string => {
  console.error({ error });
  const errorMessage =
    error?.response?.data?.data?.error?.message ||
    error?.response?.data?.data?.message ||
    error?.response?.data?.message ||
    error?.message ||
    error?.data?.error?.message ||
    "Произошла неизвестная ошибка";

  console.error("API Error:", {
    message: errorMessage,
    status: error?.response?.status,
    statusText: error?.response?.statusText,
    fullError: error,
  });

  return errorMessage;
};

export const onError = (error: ErrorResponse): void => {
  const errorMessage = handleApiError(error);
  alert(errorMessage);
};
