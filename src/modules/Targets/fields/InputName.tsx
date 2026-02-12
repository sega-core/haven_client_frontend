import { useField } from "react-final-form";
import { ETargetField } from "../form/FormTarget.types";
import { DEFAULT_ERROR_MSG } from "../../../constats";
import { Input } from "../../../components/Input";

export const InputName = () => {
  const { input, meta } = useField(ETargetField.TITLE, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return (
    <Input
      placeholder="Название цели"
      input={input}
      meta={meta}
      isRequired
    />
  );
};
