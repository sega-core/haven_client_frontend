import { useState } from "react";
import { Typography } from "../Typography";
import { Button } from "@heroui/button";
/* import { useNavigate } from "react-router";
 */
export const ErrorComponent = ({
  error,
}: {
  error: { name?: string; message?: string; stack?: string };
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyError = async () => {
    if (!error) return;

    try {
      await navigator.clipboard.writeText(
        `${error.name}: ${error.message}\n\n${error.stack ?? ""}`,
      );
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (e) {
      console.error("Failed to copy error:", e);
    }
  };

  /* const navigate = useNavigate(); */

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md text-center bg-warning-50 shadow-lg rounded-2xl p-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
            😅
          </div>
        </div>

        <Typography type="heading-s" className="text-red-600 mb-2">
          Что-то пошло не так
        </Typography>

        <Typography type="body-s" className="text-gray-500 mb-6 break-words">
          {error?.message || "Произошла непредвиденная ошибка"}
        </Typography>
        <Button
          color="danger"
          variant="solid"
          /* onPress={() => navigate("/login")} */
          className="w-full"
        >
          Попробовать снова
        </Button>
        <Button
          variant="bordered"
          onPress={onCopyError}
          className="w-full mt-2"
        >
          {isCopied ? "Скопировано ✓" : "Скопировать ошибку"}
        </Button>
      </div>
    </div>
  );
};
