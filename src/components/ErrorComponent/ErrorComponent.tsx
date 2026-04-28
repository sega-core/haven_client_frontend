import { useState } from "react";
import { Typography } from "../Typography";
import { Button } from "@heroui/button";
import { ROUTES } from "../../containers";
import { Block } from "../Block";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <Block className="text-center!" disabledTranform>
        <div className="flex items-center justify-center pt-5">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
            😅
          </div>
        </div>

        <Typography type="heading-s" className="text-red-primary">
          Что-то пошло не так
        </Typography>

        <Typography
          type="body-s"
          className="text-red-secondary wrap-break-word"
        >
          {error?.message || "Произошла непредвиденная ошибка"}
        </Typography>
        <Button
          radius="full"
          variant="solid"
          onPress={() => document.location.replace(ROUTES.MAIN)}
          className="w-full bg-red-secondary text-white"
        >
          Попробовать снова
        </Button>
        <Button
          radius="full"
          variant="flat"
          onPress={onCopyError}
          className="w-full bg-brown-secondary"
        >
          {isCopied ? "Скопировано ✓" : "Скопировать ошибку"}
        </Button>
      </Block>
    </div>
  );
};
