import { Textarea as HeroUITextarea } from "@heroui/input";

export const TextArea = ({
  placeholder = "Добавить комментарий...",
}: {
  placeholder?: string;
}) => {
  return (
    <HeroUITextarea
      label={placeholder}
      classNames={{
        inputWrapper: "bg-beige-tertiary transition-colors duration-200",
        input: "bg-transparent text-white placeholder:text-gray-400 text-white",
        description: "bg-beige-tertiary",
      }}
    />
  );
};
