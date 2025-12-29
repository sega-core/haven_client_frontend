import { useField } from "react-final-form";
import { ETargetField } from "../form/FormTarget.types";
import { Input } from "@heroui/input";

export const InputName = () => {
  const { input, meta } = useField(ETargetField.NAME, {
    validate: (v) => {
      if (!v) return "InputNameError";
    },
  });

  return (
    <Input
      placeholder="Название цели"
      size="md"
      {...input}
      {...(meta.touched && meta.error && { isRequired: true })}
    />
  );
};
