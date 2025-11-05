import { Textarea as HeroUITextarea } from "@heroui/input";
import { DEFAULT_ERROR_MSG } from "../../constats";

export const TextArea = ({
  placeholder = "Добавить комментарий...",
  onChange,
  isInvalid,
  errorMessage = DEFAULT_ERROR_MSG,
  value,
}: {
  placeholder?: string;
  onChange: (e: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  value: string;
}) => {
  return (
    <HeroUITextarea
      label={placeholder}
      value={value}
      onValueChange={onChange}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      classNames={{
        inputWrapper: "bg-beige-tertiary transition-colors duration-200",
        input: "bg-transparent text-white placeholder:text-gray-400 text-white",
        description: "bg-beige-tertiary",
      }}
    />
  );
};
