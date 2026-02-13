import { useField } from "react-final-form";
import { Textarea } from "../../../components/Input";
import { EMoodField } from "../form/FormMood.types";
import { DEFAULT_ERROR_MSG } from "../../../constats";

export const InputText = () => {
  const { input, meta } = useField(EMoodField.COMMENT, {
    validate: (v) => {
      if (!v) return DEFAULT_ERROR_MSG;
    },
  });

  return <Textarea input={input} meta={meta} />;
};
